import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { commaizeNumber } from '@toss/utils';

import PaymentBox from '@components/payment/PaymentBox';
import PaymentForm from '@components/payment/PaymentForm';

import { CartItemType } from '@/types/cart';
import { PaymentFormValues } from '@/types/form';
import groupCartItems from '@utils/cart/groupCartItems';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';
import { requestPayment } from '@services/paymentService';
import useUser from '@hooks/useUser';

interface PaymentReadyProps {
  setStep: Dispatch<SetStateAction<number>>;
}

function PaymentReady({ setStep }: PaymentReadyProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CartItemType[];
  const user = useUser();
  const { openAlert } = useGlobalAlertStore();

  const form = useForm<PaymentFormValues>({
    mode: 'onChange',
    defaultValues: {
      deliveryMethod: '현장 수령',
      deliveryAddress: '',
      deliveryDetailAddress: '',
      deliveryMessage: '',
    },
  });
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const groupedItems = useMemo(() => groupCartItems(state), [state]);

  const totalPrice = useMemo(() => {
    return groupedItems.reduce((total, group) => {
      const groupTotalPrice = group.tickets.reduce(
        (acc, ticket) => acc + ticket.price * ticket.quantity,
        0,
      );
      return total + groupTotalPrice;
    }, 0);
  }, [groupedItems]);

  const handlePayment = (data: PaymentFormValues) => {
    if (
      data.deliveryMethod === '배송' &&
      (!data.deliveryAddress ||
        !data.deliveryDetailAddress ||
        !data.deliveryMessage)
    ) {
      openAlert('모든 배송 정보를 입력해주세요.', '');
      return;
    }

    const paymentData = {
      user,
      tickets: state,
      payment: data,
      totalPrice,
    };

    setIsPaymentProcessing(true);

    requestPayment(paymentData)
      .then(result => {
        if (result.success) {
          setStep(prev => prev + 1);
        } else {
          openAlert('오류가 발생했습니다.', result.error as string);
        }
      })
      .catch(error => {
        openAlert('오류가 발생했습니다.', error);
      })
      .finally(() => {
        setIsPaymentProcessing(false);
      });
  };

  if (!state) {
    navigate('/404');
    return null;
  }

  return (
    <div className='my-12 flex flex-col gap-10'>
      <div>
        <p className='mb-4 text-2xl'>구매 목록</p>
        <div className='border-t border-border'>
          {groupedItems.map(group => {
            const groupTotalPrice = group.tickets.reduce(
              (acc, ticket) => acc + ticket.price * ticket.quantity,
              0,
            );
            return (
              <div
                key={group.eventId}
                className='mb-4 flex items-center gap-8 border-b border-border py-6'
              >
                <div className='flex basis-5/6 flex-col gap-2'>
                  <div className='mb-4 font-semibold'>
                    <Link to={`/event/${group.eventId}`}>
                      {group.eventName}
                    </Link>
                  </div>
                  {group.tickets.map(ticket => (
                    <PaymentBox key={ticket.ticketId} ticket={ticket} />
                  ))}
                </div>
                <div className='basis-1/6 text-right text-lg font-semibold'>
                  ₩ {commaizeNumber(groupTotalPrice)}
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <p className='flex justify-end gap-8 text-lg'>
            총 결제할 금액{' '}
            <span className='font-bold'>₩ {commaizeNumber(totalPrice)}</span>
          </p>
        </div>
      </div>

      <PaymentForm
        form={form}
        onSubmit={handlePayment}
        isPaymentProcessing={isPaymentProcessing}
      />
    </div>
  );
}

export default PaymentReady;
