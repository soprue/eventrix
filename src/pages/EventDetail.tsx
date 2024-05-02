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
import InfoBox from '@components/event/InfoBox';

import formatEventDateTime from '@utils/event/formatEventDateTime';
import useUser from '@hooks/useUser';
import useEventDetail from '@hooks/useEventDetail';
import useOrganizerInfo from '@hooks/useOrganizerInfo';

function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUser();

  const { data: eventData, isLoading, isError } = useEventDetail(id!);
  const { data: organizerData } = useOrganizerInfo(
    eventData?.organizerUID as string,
  );

  if (isLoading) return <SpinnerBox />;
  if (!eventData) {
    navigate('/404');
    return null;
  }
  if (isError) return <ErrorBox />;

  return (
    <div className='pb-16 pt-10'>
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
            {user?.userType === 'buyer' && <LikeButton eventUID={id!} />}
          </div>
        </div>

        <div className='w-[310px]'>
          {eventData?.status !== '모집 진행' ||
          user?.userType === 'organizer' ? (
            <Button className='w-full' disabled>
              이벤트 참여하기
            </Button>
          ) : (
            <Button
              className='w-full'
              onClick={() => navigate(`/register/${id}`)}
            >
              이벤트 참여하기
            </Button>
          )}
        </div>
      </div>

      <div className='flex justify-between'>
        <div className='w-[800px]'>
          <InfoBox className='mb-9'>
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
          </InfoBox>

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
