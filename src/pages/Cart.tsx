import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function Cart() {
  const navigate = useNavigate();
  const { cartItems } = useCartStore();

  const [totalPrice, setTotalPrice] = useState<number>(0);

  return (
    <div className='my-32'>
      <p className='text-3xl font-bold'>장바구니</p>

      {cartItems.length !== 0 ? (
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
            <div className='mb-4 flex items-center gap-8 border-b border-border py-6'>
              <div className='flex basis-1/6 items-center justify-center gap-8'>
                <Checkbox id='terms' />
                <div className='block h-[64px] w-[130px] rounded-md bg-black'>
                  <img src='' alt='이벤트 썸네일' />
                </div>
              </div>
              <div className='flex basis-4/6 flex-col gap-2'>
                <div className='mb-4 font-semibold'>
                  Regional Scrum Gathering Seoul 2024
                </div>
                <div className='flex items-center justify-between'>
                  일반 티켓
                  <Select defaultValue='1'>
                    <SelectTrigger className='w-[100px]'>
                      <SelectValue placeholder='1' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='1'>1</SelectItem>
                        <SelectItem value='2'>2</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex items-center justify-between'>
                  VIP 티켓
                  <Select defaultValue='1'>
                    <SelectTrigger className='w-[100px]'>
                      <SelectValue placeholder='1' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='1'>1</SelectItem>
                        <SelectItem value='2'>2</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='basis-1/6 text-right text-lg font-semibold'>
                ₩ 27,000
              </div>
            </div>
            <Button variant='outline'>선택 삭제</Button>
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
