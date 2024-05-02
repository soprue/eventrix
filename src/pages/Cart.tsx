import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { commaizeNumber } from '@toss/utils';

import { Button } from '@components/ui/button';
import CartBox from '@components/cart/CartBox';

import { useCartStore } from '@store/useCartStore';
import groupCartItems from '@utils/cart/groupCartItems';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateItemQuantity, removeFromCart } = useCartStore();
  const [selectedTickets, setSelectedTickets] = useState<{
    [key: string]: boolean;
  }>({});

  const 티켓을선택했는지 = useMemo(
    () => Object.values(selectedTickets).some(value => value),
    [selectedTickets],
  );

  const groupedItems = useMemo(() => groupCartItems(cartItems), [cartItems]);

  const totalPrice = useMemo(() => {
    return groupedItems.reduce((total, group) => {
      const groupTotalPrice = group.tickets.reduce(
        (acc, ticket) => acc + ticket.price * ticket.quantity,
        0,
      );
      return total + groupTotalPrice;
    }, 0);
  }, [groupedItems]);

  const handleRemoveSelected = () => {
    Object.keys(selectedTickets).forEach(ticketId => {
      if (selectedTickets[ticketId]) {
        removeFromCart(ticketId);
      }
    });
    setSelectedTickets({});
  };

  const handleSubmit = () => {
    const paymentData = cartItems.filter(
      item => selectedTickets[item.ticketId],
    );

    navigate('/payment', { state: paymentData });
  };

  return (
    <div className='my-32'>
      <p className='text-3xl font-bold'>장바구니</p>

      {cartItems.length === 0 ? (
        <div className='mt-10 border-b border-t border-border py-10 text-center leading-8'>
          <p className='text-xl font-semibold'>
            장바구니에 담긴 이벤트가 없습니다.
          </p>
          <p>원하는 이벤트를 장바구니에 담아보세요!</p>

          <Button
            variant='outline'
            className='mt-8 text-base'
            onClick={() => navigate('/')}
          >
            이벤트 둘러보기
          </Button>
        </div>
      ) : (
        <>
          <div className='mb-32 mt-12 border-t border-border'>
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
                      <CartBox
                        key={ticket.ticketId}
                        ticket={ticket}
                        setSelectedTickets={setSelectedTickets}
                        updateItemQuantity={updateItemQuantity}
                      />
                    ))}
                  </div>
                  <div className='basis-1/6 text-right text-lg font-semibold'>
                    ₩ {commaizeNumber(groupTotalPrice)}
                  </div>
                </div>
              );
            })}
            <Button variant='outline' onClick={handleRemoveSelected}>
              선택 삭제
            </Button>
          </div>

          <div className='flex w-full flex-col gap-6'>
            <p className='flex gap-8 text-2xl'>
              총 결제할 금액{' '}
              <span className='font-bold'>₩ {commaizeNumber(totalPrice)}</span>
            </p>
            <div className='grid grid-cols-1'>
              <Button
                disabled={!티켓을선택했는지}
                onClick={() => handleSubmit()}
              >
                결제하기
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
