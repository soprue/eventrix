import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { commaizeNumber } from '@toss/utils';

import SpinnerBox from '@shared/SpinnerBox';
import ErrorBox from '@shared/ErrorBox';
import EventInfoBox from '@shared/EventInfoBox';
import EventInfoRow from '@shared/EventInfoRow';
import { Button } from '@components/ui/button';
import { RadioGroup } from '@components/ui/radio-group';
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

  if (isLoading) return <SpinnerBox />;
  if (!eventData) {
    navigate('/404', { replace: true });
    return null;
  }
  if (isError) return <ErrorBox />;

  return (
    <div className='mobile:py-10 w-full py-14'>
      <div className='tablet:text-2xl mobile:text-xl text-[28px] font-medium'>
        {eventData?.name}
      </div>

      <EventInfoBox className='tablet:mt-9 mobile:mt-6 mt-11'>
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

      <div className='tablet:my-16 mobile:my-14 my-24'>
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

      <div className='mobile:gap-4 flex w-full flex-col gap-6'>
        <p className='tablet:text-xl mobile:text-lg flex gap-8 text-2xl'>
          총 결제할 금액
          <span className='font-bold'>₩ {commaizeNumber(totalPrice)}</span>
        </p>
        <div className='mobile:gap-1 grid grid-cols-2 gap-2'>
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
