import { commaizeNumber } from '@toss/utils';
import { IoTicket } from 'react-icons/io5';

import { TicketType } from '@/types/event';

interface TicketBoxProps {
  ticket: TicketType;
}

function TicketBox({ ticket }: TicketBoxProps) {
  return (
    <div className='flex flex-col border-b border-dashed border-border px-2 py-6'>
      <p className='text-xl'>₩ {commaizeNumber(ticket.price)}</p>
      <p className='text-lg font-semibold'>{ticket.optionName}</p>
      <div className='mt-4 flex items-center gap-2 text-sm text-gray-500'>
        <IoTicket />
        <span>{ticket.scheduledCount - ticket.soldCount}개 남음</span>
      </div>
    </div>
  );
}

export default TicketBox;
