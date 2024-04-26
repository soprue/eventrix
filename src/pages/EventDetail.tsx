import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { formatPhoneNumber } from '@toss/utils';
import MDEditor from '@uiw/react-md-editor';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';

import { Button } from '@components/ui/button';
import SpinnerBox from '@components/shared/SpinnerBox';
import ErrorBox from '@components/shared/ErrorBox';
import LikeButton from '@components/event/LikeButton';
import InfoRow from '@components/event/InfoRow';
import TicketBox from '@components/event/TicketBox';

import { EventType } from '@/types/event';
import { UserType } from '@/types/user';
import { getEvent } from '@services/eventService';
import { getUserInfo } from '@services/userService';
import formatEventDateTime from '@utils/event/formatEventDateTime';

function EventDetail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  // 이벤트 정보를 비동기로 가져오는 쿼리
  const {
    data: eventData,
    isLoading,
    isError,
  } = useQuery<EventType>(['event', id], () => getEvent(id!), {
    initialData: () => {
      return queryClient.getQueryData(['event', id]);
    },
  });

  // 주최자 정보를 비동기로 가져오는 쿼리
  const { data: organizerData } = useQuery<UserType>(
    ['user', eventData?.organizerUID],
    () => getUserInfo(eventData?.organizerUID as string),
    {
      enabled: !!eventData?.organizerUID,
    },
  );

  if (isLoading) return <SpinnerBox />;

  if (isError) return <ErrorBox />;

  if (!eventData) {
    navigate('/404');
    return null;
  }

  return (
    <div className='py-10'>
      <div className='h-[350px] w-full overflow-hidden rounded-md'>
        <img
          src={eventData?.thumbnail}
          alt='이벤트 썸네일'
          className='size-full object-cover'
        />
      </div>

      <div className='mb-9 mt-11 flex justify-between'>
        <div className='flex w-[800px] justify-between'>
          <div className='text- text-[28px] font-medium'>{eventData?.name}</div>
          <div>
            <LikeButton id={id!} />
          </div>
        </div>

        <div className='w-[310px]'>
          {eventData?.status === '모집 진행' ? (
            <Button className='w-full'>이벤트 참여하기</Button>
          ) : (
            <Button className='w-full' disabled>
              이벤트 참여하기
            </Button>
          )}
        </div>
      </div>

      <div className='flex justify-between'>
        <div className='w-[800px]'>
          <div className='mb-9 flex w-full flex-col gap-2 border-b border-t border-border px-2 py-6'>
            <InfoRow
              label='일시'
              value={formatEventDateTime(
                eventData.startDateTime,
                eventData.endDateTime,
              )}
            />
            <InfoRow
              label='모집'
              value={formatEventDateTime(
                eventData.registrationStart,
                eventData.registrationEnd,
              )}
            />
            <InfoRow label='장소' value={eventData?.location} />
            <InfoRow label='주최' value={organizerData?.nickname as string} />
          </div>

          <div data-color-mode='light' className='p-4'>
            <MDEditor.Markdown source={eventData.description} />
          </div>
        </div>

        <div className='w-[310px]'>
          <div className='border- border-t border-dashed border-border'>
            {eventData.ticketOptions.map(ticket => (
              <TicketBox key={ticket.id} ticket={ticket} />
            ))}
          </div>

          <div className='py-6'>
            <p className='text-lg'>주최자 연락처</p>
            <div className='mt-4 rounded-md bg-gray-100 p-2 text-sm text-gray-500'>
              <div className='flex items-center gap-2'>
                <MdEmail />
                {organizerData?.email}
              </div>
              <div className='flex items-center gap-2'>
                <FaPhoneAlt />
                {organizerData &&
                  formatPhoneNumber(organizerData?.phone as string)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
