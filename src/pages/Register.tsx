import { Suspense, lazy, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { commaizeNumber } from '@toss/utils';

const SpinnerBox = lazy(() => import('@shared/SpinnerBox'));
const ErrorBox = lazy(() => import('@shared/ErrorBox'));
import { Button } from '@components/ui/button';
import { RadioGroup } from '@components/ui/radio-group';
import EventInfoBox from '@shared/EventInfoBox';
import EventInfoRow from '@shared/EventInfoRow';
import TicketOptionBox from '@components/register/TicketOptionBox';

import useEventDetail from '@hooks/useEventDetail';
import useOrganizerInfo from '@hooks/useOrganizerInfo';
import formatEventPeriod from '@utils/event/formatEventPeriod';
import { useCartStore } from '@store/useCartStore';

function Register() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedTicket, setSelectedTicket] = useState<string>('');
  const [ticketQuantity, setTicketQuantity] = useState<string>('1');
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { addToCart } = useCartStore();
  const { data: eventData, isLoading, isError } = useEventDetail(id!);
  const { data: organizerData } = useOrganizerInfo(
    eventData?.organizerUID as string,
  );

  const 티켓을선택했는지 = selectedTicket !== '';

  const handleTicketChange = (ticketId: string) => {
    const ticketOption = eventData?.ticketOptions.find(
      option => option.id === ticketId,
    );
    if (ticketOption) {
      setSelectedTicket(ticketId);
      setTicketQuantity('1');
    }
  };

  const updateTotalPrice = (price: number, quantity: number) => {
    setTotalPrice(price * quantity);
  };

  useEffect(() => {
    if (selectedTicket) {
      const ticketOption = eventData?.ticketOptions.find(
        option => option.id === selectedTicket,
      );
      if (ticketOption) {
        updateTotalPrice(ticketOption.price, Number(ticketQuantity));
      }
    }
  }, [ticketQuantity, selectedTicket, eventData]);

  const handleSubmit = (actionType: string) => {
    if (actionType === 'pay') {
      if (selectedTicket && eventData) {
        const ticketOption = eventData.ticketOptions.find(
          option => option.id === selectedTicket,
        );
        if (ticketOption) {
          navigate('/payment', {
            state: [
              {
                eventId: eventData.uid!,
                eventName: eventData.name,
                ticketId: selectedTicket,
                name: ticketOption.optionName,
                price: ticketOption.price,
                quantity: Number(ticketQuantity),
              },
            ],
          });
        }
      }
    } else {
      if (selectedTicket && eventData) {
        const ticketOption = eventData.ticketOptions.find(
          option => option.id === selectedTicket,
        );
        if (ticketOption) {
          addToCart({
            eventId: eventData.uid!,
            eventName: eventData.name,
            ticketId: selectedTicket,
            name: ticketOption.optionName,
            price: ticketOption.price,
            quantity: Number(ticketQuantity),
          });
          navigate('/cart');
        }
      }
    }
  };

  if (isLoading)
    return (
      <Suspense>
        <SpinnerBox />
      </Suspense>
    );
  if (!eventData) {
    navigate('/404', { replace: true });
    return null;
  }
  if (isError)
    return (
      <Suspense>
        <ErrorBox />
      </Suspense>
    );

  return (
    <div className='w-full py-14 mobile:py-10'>
      <div className='text-[28px] font-medium tablet:text-2xl mobile:text-xl'>
        {eventData?.name}
      </div>

      <EventInfoBox className='mt-11 tablet:mt-9 mobile:mt-6'>
        <EventInfoRow
          label='일시'
          value={formatEventPeriod(
            eventData.startDateTime,
            eventData.endDateTime,
          )}
        />
        <EventInfoRow label='장소' value={eventData?.location} />
        <EventInfoRow label='주최' value={organizerData?.nickname as string} />
      </EventInfoBox>

      <div className='my-24 tablet:my-16 mobile:my-14'>
        <RadioGroup onValueChange={handleTicketChange} className='gap-8'>
          {eventData?.ticketOptions.map(option => (
            <TicketOptionBox
              key={option.id}
              option={option}
              setTicketQuantity={setTicketQuantity}
            />
          ))}
        </RadioGroup>
      </div>

      <div className='flex w-full flex-col gap-6 mobile:gap-4'>
        <p className='flex gap-8 text-2xl tablet:text-xl mobile:text-lg'>
          총 결제할 금액
          <span className='font-bold mobile:font-semibold'>
            ₩ {commaizeNumber(totalPrice)}
          </span>
        </p>
        <div className='grid grid-cols-2 gap-2 mobile:gap-1'>
          <Button
            disabled={!티켓을선택했는지}
            onClick={() => handleSubmit('pay')}
            className='mobile:font-normal'
            data-cy='register-pay-button'
          >
            결제하기
          </Button>
          <Button
            disabled={!티켓을선택했는지}
            onClick={() => handleSubmit('cart')}
            className='mobile:font-normal'
            data-cy='register-cart-button'
          >
            장바구니에 담기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Register;
