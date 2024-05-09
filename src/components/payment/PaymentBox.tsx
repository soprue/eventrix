import { commaizeNumber } from '@toss/utils';

import { CartItemType } from '@/types/cart';

interface PaymentBoxProps {
  ticket: CartItemType;
}

function PaymentBox({ ticket }: PaymentBoxProps) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center justify-start gap-8'>
        <label htmlFor={ticket.ticketId}>
          {ticket.name}
          <span className='ml-6 inline-block text-sm text-gray-500'>
            ₩ {commaizeNumber(ticket.price)}
          </span>
        </label>
      </div>
      <div>
        <span className='inline-block w-10 rounded-sm bg-gray-300 text-center text-sm'>
          {ticket.quantity}
        </span>
      </div>
    </div>
  );
}

export default PaymentBox;
