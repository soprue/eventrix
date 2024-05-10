import { commaizeNumber } from '@toss/utils';
import { IoTicket } from 'react-icons/io5';

import { TicketOptionType } from '@/types/event';

interface TicketBoxProps {
  ticket: TicketOptionType;
}

function TicketBox({ ticket }: TicketBoxProps) {
  return (
    <div className='tablet:py-4 flex flex-col border-b border-dashed border-border px-2 py-6'>
      <p className='tablet:text-base text-xl'>
        ₩ {commaizeNumber(ticket.price)}
      </p>
      <p className='tablet:text-base text-lg font-semibold'>
        {ticket.optionName}
      </p>
      <div className='tablet:text-xs mt-4 flex items-center gap-2 text-sm text-gray-500'>
        <IoTicket />
        <span>{ticket.scheduledCount - ticket.soldCount}개 남음</span>
      </div>
    </div>
  );
}

export default TicketBox;
