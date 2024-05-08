import { Dispatch, SetStateAction } from 'react';
import { commaizeNumber } from '@toss/utils';

import { Checkbox } from '@components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

import { CartItemType } from '@/types/cart';

interface CartBoxProps {
  ticket: CartItemType;
  updateItemQuantity: (ticketId: string, quantity: number) => void;
  setSelectedTickets: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}

function CartBox({
  ticket,
  updateItemQuantity,
  setSelectedTickets,
}: CartBoxProps) {
  const handleQuantityChange = (ticketId: string, quantity: string) => {
    updateItemQuantity(ticketId, parseInt(quantity, 10));
  };

  const handleCheckboxChange = (ticketId: string) => {
    setSelectedTickets(prev => ({ ...prev, [ticketId]: !prev[ticketId] }));
  };

  return (
    <div className='flex items-center justify-between' data-cy='cart-box'>
      <div className='flex items-center justify-start gap-8'>
        <Checkbox
          key={ticket.ticketId}
          id={ticket.ticketId}
          onClick={() => handleCheckboxChange(ticket.ticketId)}
          data-cy='cart-checkbox'
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
        onValueChange={value => handleQuantityChange(ticket.ticketId, value)}
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
  );
}

export default CartBox;
