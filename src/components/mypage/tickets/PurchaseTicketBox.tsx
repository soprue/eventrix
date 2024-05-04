import { Link } from 'react-router-dom';
import { commaizeNumber } from '@toss/utils';

import { Badge } from '@components/ui/badge';
import EventInfoBox from '@shared/EventInfoBox';
import EventInfoRow from '@shared/EventInfoRow';

import { PurchaseTicketType } from '@/types/ticket';
import formatSingleTimestamp from '@utils/formatSingleTimestamp';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';
import { canclePurchase } from '@services/paymentService';

interface PurchaseTicketBoxProps {
  event: PurchaseTicketType;
}

function PurchaseTicketBox({ event }: PurchaseTicketBoxProps) {
  const { openAlert } = useGlobalAlertStore();

  const handleCancel = () => {
    try {
      canclePurchase(event.id!)
        .then(result => {
          if (result.success) {
            openAlert('취소가 완료되었습니다.', '');
          } else {
            openAlert('오류가 발생했습니다.', result.error as string);
          }
        })
        .catch(error => {
          openAlert('오류가 발생했습니다.', error.error);
        });
    } catch (error) {
      openAlert('오류가 발생했습니다.', error as string);
    }
  };

  return (
    <EventInfoBox>
      <Link
        to={`/event/${event.eventUID}`}
        className='mb-1 w-fit text-xl font-semibold'
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
          <Badge
            variant='outline'
            className='flex w-[70px] cursor-default items-center justify-center'
          >
            {event.ticketStatus}
          </Badge>
          {event.ticketStatus !== '취소' && (
            <Badge
              role='button'
              onClick={handleCancel}
              className='flex w-[70px] items-center justify-center'
            >
              취소하기
            </Badge>
          )}
        </div>
      </div>
    </EventInfoBox>
  );
}

export default PurchaseTicketBox;
