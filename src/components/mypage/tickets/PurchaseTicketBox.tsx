import { Link } from 'react-router-dom';
import { commaizeNumber } from '@toss/utils';

import { Badge } from '@components/ui/badge';
import EventInfoBox from '@shared/EventInfoBox';
import EventInfoRow from '@shared/EventInfoRow';

import { PurchaseTicketType } from '@/types/ticket';
import formatSingleTimestamp from '@/utils/formatSingleTimestamp';

interface PurchaseTicketBoxProps {
  event: PurchaseTicketType;
}

function PurchaseTicketBox({ event }: PurchaseTicketBoxProps) {
  return (
    <EventInfoBox>
      <Link
        to={`/event/${event.eventUID}`}
        className='mb-1 text-xl font-semibold'
      >
        {event.name}
      </Link>

      <div className='mt-5 flex items-end justify-between'>
        <div className='flex flex-col gap-2'>
          <EventInfoRow size='md' label='티켓 ID' value={event.id!} />
          <EventInfoRow
            size='md'
            label='결제일'
            value={formatSingleTimestamp(event.purchaseDate)}
          />
          <EventInfoRow
            size='md'
            label='정보'
            value={`${event.ticketOptionName} / ${event.quantity}매 / ₩ ${commaizeNumber(event.ticketPrice * event.quantity)}`}
          />
        </div>
        <div className='flex gap-2'>
          <Badge variant='outline'>{event.ticketStatus}</Badge>
          <Badge role='button'>취소하기</Badge>
        </div>
      </div>
    </EventInfoBox>
  );
}

export default PurchaseTicketBox;
