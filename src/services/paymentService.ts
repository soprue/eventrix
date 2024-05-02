import PortOne from '@portone/browser-sdk/v2';
import {
  addDoc,
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from './firebaseConfig';
import { CartItemType } from '@/types/cart';
import { PaymentFormValues } from '@/types/form';
import { UserType } from '@/types/user';
import { TicketType } from '@/types/event';

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
          (option: TicketType) => option.id === ticket.ticketId,
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
            (option: TicketType) => {
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

      const response = await PortOne.requestPayment({
        storeId: import.meta.env.VITE_PORTONE_STORE_ID,
        channelKey: import.meta.env.VITE_PORTONE_CHANNEL_KEY,
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: 'EVENTRIX',
        totalAmount: 1000,
        currency: 'CURRENCY_KRW',
        payMethod: 'CARD',
      });

      if (response!.code) {
        throw new Error(response?.message);
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

// 티켓과 주문 정보를 데이터베이스에 저장하는 함수
const recordPurchase = async (
  user: UserType,
  tickets: CartItemType[],
  payment: PaymentFormValues,
  totalPrice: number,
) => {
  try {
    // 티켓 정보를 먼저 저장하고, 각 티켓의 UID를 저장
    const ticketRefs = await Promise.all(
      tickets.map(ticket =>
        addDoc(collection(db, 'tickets'), {
          buyerUID: user.uid,
          eventUID: ticket.eventId,
          ticketOptionName: ticket.name,
          quantity: ticket.quantity,
          ticketPrice: ticket.price,
          ticketStatus:
            payment.deliveryMethod === '현장 수령' ? '현장 수령' : '배송',
          purchaseDate: serverTimestamp(),
        }),
      ),
    );

    // 주문 컬렉션에 주문 정보 추가, 티켓의 UID를 포함
    const orderRef = await addDoc(collection(db, 'orders'), {
      buyerUID: user.uid,
      tickets: ticketRefs.map(ref => ref.id),
      orderDate: serverTimestamp(),
      totalPrice: totalPrice,
      deliveryAddress: payment.deliveryAddress,
      deliveryMessage: payment.deliveryMessage,
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
