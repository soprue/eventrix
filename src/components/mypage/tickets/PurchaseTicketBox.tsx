import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { commaizeNumber } from '@toss/utils';

import { Badge } from '@components/ui/badge';
import EventInfoBox from '@shared/EventInfoBox';
import EventInfoRow from '@shared/EventInfoRow';

import { PurchaseTicketType } from '@/types/ticket';
import formatSingleTimestamp from '@utils/formatSingleTimestamp';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';
import { canclePurchase } from '@services/paymentService';
import useUser from '@hooks/useUser';

interface PurchaseTicketBoxProps {
  event: PurchaseTicketType;
  page: number;
}

function PurchaseTicketBox({ event, page }: PurchaseTicketBoxProps) {
  const queryClient = useQueryClient();
  const { openAlert } = useGlobalAlertStore();
  const user = useUser();

  const handleCancel = () => {
    try {
      canclePurchase(event.id!)
        .then(result => {
          if (result.success) {
            openAlert('취소가 완료되었습니다.', '');
            queryClient.invalidateQueries(['tickets', user?.uid, page]);
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
        className='tablet:text-lg mb-1 w-fit text-xl font-semibold'
      >
        {event.name}
      </Link>

      <div className='tablet:mt-3 mt-5 flex items-end justify-between'>
        <div className='tablet:gap-1 flex flex-col gap-2'>
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
        <div className='tablet:gap-1 flex gap-2'>
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
