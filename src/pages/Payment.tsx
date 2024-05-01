import { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { CartItemType } from '@/types/cart';
import groupCartItems from '@utils/cart/groupCartItems';
import PaymentBox from '@/components/payment/PaymentBox';
import { commaizeNumber } from '@toss/utils';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CartItemType[];

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

  if (!state) {
    navigate('/404');
    return null;
  }

  return (
    <div className='flex flex-col gap-20'>
      <div className='mt-12'>
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

      <div>
        <p className='mb-4 text-2xl'>티켓 수령 방법</p>
      </div>

      <div>
        <p className='mb-4 text-2xl'>결제 방법</p>
      </div>
    </div>
  );
}

export default Payment;
