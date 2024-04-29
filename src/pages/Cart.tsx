import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { commaizeNumber } from '@toss/utils';

import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

import { useCartStore } from '@store/useCartStore';
import groupCartItems from '@utils/cart/groupCartItems';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateItemQuantity, removeFromCart } = useCartStore();
  const [selectedTickets, setSelectedTickets] = useState<{
    [key: string]: boolean;
  }>({});

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

  const handleQuantityChange = (ticketId: string, quantity: string) => {
    updateItemQuantity(ticketId, parseInt(quantity, 10));
  };

  const handleCheckboxChange = (ticketId: string) => {
    setSelectedTickets(prev => ({ ...prev, [ticketId]: !prev[ticketId] }));
  };

  const handleRemoveSelected = () => {
    Object.keys(selectedTickets).forEach(ticketId => {
      if (selectedTickets[ticketId]) {
        removeFromCart(ticketId);
      }
    });
    setSelectedTickets({});
  };

  console.log(selectedTickets);
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
                <div className='mb-4 flex items-center gap-8 border-b border-border py-6'>
                  <div className='flex basis-5/6 flex-col gap-2'>
                    <div className='mb-4 font-semibold'>
                      <Link to={`/event/${group.eventId}`}>
                        {group.eventName}
                      </Link>
                    </div>
                    {group.tickets.map(ticket => (
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center justify-start gap-8'>
                          <Checkbox
                            key={ticket.ticketId}
                            id={ticket.ticketId}
                            onClick={() =>
                              handleCheckboxChange(ticket.ticketId)
                            }
                          />
                          <label htmlFor={ticket.ticketId}>
                            {ticket.name}
                            <span className='ml-6 inline-block text-sm text-gray-500'>
                              ₩ {commaizeNumber(ticket.price)}
                            </span>
                          </label>
                        </div>
                        <Select
                          defaultValue={String(ticket.quantity)}
                          onValueChange={value =>
                            handleQuantityChange(ticket.ticketId, value)
                          }
                        >
                          <SelectTrigger className='w-[100px]'>
                            <SelectValue placeholder={ticket.quantity} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='1'>1</SelectItem>
                              <SelectItem value='2'>2</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
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
              <Button disabled>결제하기</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
