import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { commaizeNumber } from '@toss/utils';

import { Button } from '@components/ui/button';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import SpinnerBox from '@components/shared/SpinnerBox';
import ErrorBox from '@components/shared/ErrorBox';
import InfoBox from '@components/event/InfoBox';
import InfoRow from '@components/event/InfoRow';

import useEventDetail from '@hooks/useEventDetail';
import useOrganizerInfo from '@hooks/useOrganizerInfo';
import formatEventDateTime from '@utils/event/formatEventDateTime';

function Register() {
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState<string>('');
  const [ticketQuantity, setTicketQuantity] = useState<string>('1');
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { data: eventData, isLoading, isError } = useEventDetail();
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
      updateTotalPrice(ticketOption.price, Number(ticketQuantity));
    }
  };

  const handleQuantityChange = (value: string) => {
    setTicketQuantity(value);
    if (selectedTicket) {
      const ticketOption = eventData?.ticketOptions.find(
        option => option.id === selectedTicket,
      );
      if (ticketOption) {
        updateTotalPrice(ticketOption.price, Number(value));
      }
    }
  };

  const updateTotalPrice = (price: number, quantity: number) => {
    setTotalPrice(price * quantity);
  };

  const handleSubmit = (actionType: string) => {
    if (actionType === 'pay') {
      // navigate('/payment', {
      //   state: { ticketId: selectedTicket, quantity: ticketQuantity },
      // });
    } else {
      // 장바구니 로직 처리
    }
  };

  if (isLoading) return <SpinnerBox />;
  if (isError) return <ErrorBox />;
  if (!eventData) {
    navigate('/404');
    return null;
  }

  return (
    <div className='w-full py-14'>
      <div className='text- text-[28px] font-medium'>{eventData?.name}</div>

      <InfoBox className='mt-11'>
        <InfoRow
          label='일시'
          value={formatEventDateTime(
            eventData.startDateTime,
            eventData.endDateTime,
          )}
        />
        <InfoRow label='장소' value={eventData?.location} />
        <InfoRow label='주최' value={organizerData?.nickname as string} />
      </InfoBox>

      <div className='my-20'>
        <RadioGroup onValueChange={handleTicketChange} className='gap-8'>
          {eventData?.ticketOptions.map(option => (
            <div key={option.id} className='flex items-center justify-between'>
              <div className='flex items-center space-x-8'>
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className='!font-normal'>
                  <p className='text-sm'>₩ {commaizeNumber(option.price)}</p>
                  <p className='text-lg'>{option.optionName}</p>
                </Label>
              </div>
              <div>
                <Select defaultValue='1' onValueChange={handleQuantityChange}>
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
          ))}
        </RadioGroup>
      </div>

      <div className='flex w-full flex-col gap-6'>
        <p className='flex gap-8 text-2xl'>
          총 결제할 금액{' '}
          <span className='font-bold'>₩ {commaizeNumber(totalPrice)}</span>
        </p>
        <div className='grid grid-cols-2 gap-2'>
          <Button
            disabled={!티켓을선택했는지}
            onClick={() => handleSubmit('pay')}
          >
            결제하기
          </Button>
          <Button disabled={!티켓을선택했는지}>장바구니에 담기</Button>
        </div>
      </div>
    </div>
  );
}

export default Register;
