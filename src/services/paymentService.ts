import {
  addDoc,
  collection,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore/lite';
import PortOne from '@portone/browser-sdk/v2';

import { db } from './firebaseConfig';
import { CartItemType } from '@/types/cart';
import { PaymentFormValues } from '@/types/form';
import { UserType } from '@/types/user';
import { TicketOptionType } from '@/types/event';

/**
 * PortOne SDK를 사용하여 결제 처리를 요청하고 Firestore 내에서 트랜잭션을 처리합니다.
 * @param {Object} data - 결제 처리에 필요한 데이터입니다.
 * @param {UserType | null} data.user - 구매를 진행하는 사용자입니다.
 * @param {CartItemType[]} data.tickets - 사용자가 구매하는 티켓 배열입니다.
 * @param {PaymentFormValues} data.payment - 배송 및 결제 정보를 포함하는 결제 폼 값입니다.
 * @param {number} data.totalPrice - 주문의 총 가격입니다.
 * @returns {Promise<{success: boolean, error?: string}>} 결제 요청의 결과를 반환하는 프로미스입니다.
 */
export const requestPayment = async (data: {
  user: UserType | null;
  tickets: CartItemType[];
  payment: PaymentFormValues;
  totalPrice: number;
}) => {
  const { user, tickets, payment, totalPrice } = data;

  try {
    await runTransaction(db, async transaction => {
      const ticketUpdates = [];

      for (const ticket of tickets) {
        const eventRef = doc(db, 'events', ticket.eventId);
        const eventSnap = await transaction.get(eventRef);

        if (!eventSnap.exists()) {
          throw new Error(`[${ticket.eventId}] 이벤트가 존재하지 않습니다.`);
        }

        const eventData = eventSnap.data();
        const ticketOption = eventData.ticketOptions.find(
          (option: TicketOptionType) => option.id === ticket.ticketId,
        );

        const availableCount =
          ticketOption.scheduledCount - ticketOption.soldCount;
        if (ticket.quantity > availableCount) {
          throw new Error(
            `[${ticket.eventName}] - [${ticket.name}] 티켓이 모두 판매되었습니다.`,
          );
        }

        ticketUpdates.push({
          eventRef,
          updatedTicketOptions: eventData.ticketOptions.map(
            (option: TicketOptionType) => {
              if (option.id === ticket.ticketId) {
                return {
                  ...option,
                  soldCount: option.soldCount + ticket.quantity,
                };
              }
              return option;
            },
          ),
        });
      }

      ticketUpdates.forEach(({ eventRef, updatedTicketOptions }) => {
        transaction.update(eventRef, { ticketOptions: updatedTicketOptions });
      });

      if (totalPrice > 0) {
        const response = await PortOne.requestPayment({
          storeId: import.meta.env.VITE_PORTONE_STORE_ID,
          channelKey: import.meta.env.VITE_PORTONE_CHANNEL_KEY,
          paymentId: `payment-${crypto.randomUUID()}`,
          orderName: 'EVENTRIX',
          totalAmount: totalPrice,
          currency: 'CURRENCY_KRW',
          payMethod: 'CARD',
        });

        if (response!.code) {
          throw new Error(response?.message);
        }
      }

      // 결제 성공 후 구매 정보 기록
      await recordPurchase(user!, tickets, payment, totalPrice);
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: '오류가 발생했습니다.' };
    }
  }
};

/**
 * Firestore 데이터베이스에 구매 정보를 기록합니다. 주문 및 티켓 문서를 생성합니다.
 * @param {UserType} user - 구매자에 대한 정보를 포함하는 사용자 객체입니다.
 * @param {CartItemType[]} tickets - 구매되는 티켓 배열입니다.
 * @param {PaymentFormValues} payment - 결제 및 배송 정보입니다.
 * @param {number} totalPrice - 모든 티켓의 총 가격입니다.
 * @returns {Promise<{success: boolean, orderId?: string, error?: string}>} 주문 기록의 결과를 반환하는 프로미스입니다.
 */
const recordPurchase = async (
  user: UserType,
  tickets: CartItemType[],
  payment: PaymentFormValues,
  totalPrice: number,
) => {
  try {
    const orderRef = await addDoc(collection(db, 'orders'), {
      buyerUID: user.uid,
      orderDate: serverTimestamp(),
      totalPrice: totalPrice,
      deliveryMethod: payment.deliveryMethod,
      deliveryAddress: payment.deliveryAddress,
      deliveryMessage: payment.deliveryMessage,
    });

    const ticketRefs = await Promise.all(
      tickets.map(ticket =>
        addDoc(collection(db, 'tickets'), {
          buyerUID: user.uid,
          eventUID: ticket.eventId,
          orderUID: orderRef.id,
          ticketOptionId: ticket.ticketId,
          ticketOptionName: ticket.name,
          quantity: ticket.quantity,
          ticketPrice: ticket.price,
          ticketStatus:
            payment.deliveryMethod === '현장 수령' ? '현장 수령' : '배송 준비',
          purchaseDate: serverTimestamp(),
        }),
      ),
    );

    await updateDoc(orderRef, {
      tickets: ticketRefs.map(ref => ref.id),
    });

    return { success: true, orderId: orderRef.id };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: '오류가 발생했습니다.' };
    }
  }
};

/**
 * Firestore 데이터베이스에서 트랜잭션을 사용하여 티켓을 취소합니다.
 * 티켓과 관련된 이벤트의 판매된 티켓 수를 감소시키고, 티켓의 상태를 '취소'로 업데이트합니다.
 *
 * @param {string} ticketId - 취소할 티켓의 ID입니다.
 * @returns {Promise<{success: boolean, error?: string}>} 티켓 취소 요청의 성공 여부와 에러 메시지를 포함하는 객체를 반환하는 프로미스입니다.
 * @throws {Error} 티켓이 존재하지 않거나, 이벤트가 존재하지 않거나, 해당 티켓 옵션이 없는 경우 에러를 발생시킵니다.
 */
export const canclePurchase = async (ticketId: string) => {
  try {
    const ticketRef = doc(db, 'tickets', ticketId);
    const ticketSnap = await getDoc(ticketRef);

    if (!ticketSnap.exists()) {
      throw new Error('티켓이 존재하지 않습니다.');
    }

    const ticketData = ticketSnap.data();
    const eventRef = doc(db, 'events', ticketData.eventUID);
    await runTransaction(db, async transaction => {
      const eventSnap = await transaction.get(eventRef);

      if (!eventSnap.exists()) {
        throw new Error('이벤트가 존재하지 않습니다.');
      }

      const eventData = eventSnap.data();

      const ticketOption = eventData.ticketOptions.find(
        (option: TicketOptionType) => option.id === ticketData.ticketOptionId,
      );

      if (!ticketOption) {
        throw new Error('티켓 옵션이 존재하지 않습니다.');
      }

      const updatedSoldCount = ticketOption.soldCount - ticketData.quantity;
      const updatedTicketOptions = eventData.ticketOptions.map(
        (option: TicketOptionType) =>
          option.id === ticketData.ticketOptionId
            ? { ...option, soldCount: updatedSoldCount }
            : option,
      );

      transaction.update(eventRef, { ticketOptions: updatedTicketOptions });
      transaction.update(ticketRef, { ticketStatus: '취소' });
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: '오류가 발생했습니다.' };
    }
  }
};
