import { useNavigate, useParams } from 'react-router-dom';
import { formatPhoneNumber } from '@toss/utils';
import MDEditor from '@uiw/react-md-editor';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';

import SEO from '@shared/SEO';
import SpinnerBox from '@shared/SpinnerBox';
import ErrorBox from '@shared/ErrorBox';
import EventInfoRow from '@shared/EventInfoRow';
import EventInfoBox from '@shared/EventInfoBox';
import { Button } from '@components/ui/button';
import LikeButton from '@components/event/LikeButton';
import TicketBox from '@components/event/TicketBox';

import formatEventPeriod from '@utils/event/formatEventPeriod';
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
    navigate('/404', { replace: true });
    return null;
  }
  if (isError) return <ErrorBox data-cy='error-box' />;

  return (
    <div
      className='mobile:pt-8 mobile:pb-14 pb-16 pt-10'
      data-cy='event-detail'
    >
      <SEO eventData={eventData} />

      <div className='tablet:h-[280px] mobile:h-[200px] h-[350px] w-full overflow-hidden rounded-md'>
        <img
          src={eventData?.thumbnail}
          alt='이벤트 썸네일'
          className='size-full object-cover'
          data-cy='event-thumbnail'
        />
      </div>

      <div className='tablet:gap-4 tablet:mb-6 tablet:mt-9 mobile:flex-col mobile:mb-7 mobile:mt-9 mb-9 mt-11 flex justify-between'>
        <div className='mobile:w-full mobile:gap-2 flex w-[800px] justify-between'>
          <div
            className='tablet:text-2xl mobile:text-xl break-keep text-[28px] font-medium'
            data-cy='event-name'
          >
            {eventData?.name}
          </div>
          <div>
            {user?.userType === 'buyer' && <LikeButton eventUID={id!} />}
          </div>
        </div>

        <div className='mobile:w-full w-[310px]'>
          {eventData?.status !== '모집 진행' ||
          user?.userType === 'organizer' ? (
            <Button className='w-full' disabled data-cy='join-button'>
              이벤트 참여하기
            </Button>
          ) : (
            <Button
              className='mobile:font-semibold w-full '
              onClick={() => navigate(`/register/${id}`)}
              data-cy='join-button'
            >
              이벤트 참여하기
            </Button>
          )}
        </div>
      </div>

      <div className='tablet:gap-2 mobile:flex-col flex justify-between'>
        <div className='mobile:w-full w-[800px]'>
          <EventInfoBox className='mobile:mb-6 mb-9'>
            <EventInfoRow
              label='일시'
              value={formatEventPeriod(
                eventData.startDateTime,
                eventData.endDateTime,
              )}
            />
            <EventInfoRow
              label='모집'
              value={formatEventPeriod(
                eventData.registrationStart,
                eventData.registrationEnd,
              )}
            />
            <EventInfoRow label='장소' value={eventData?.location} />
            <EventInfoRow
              label='주최'
              value={organizerData?.nickname as string}
            />
          </EventInfoBox>

          <div data-color-mode='light' className='tablet:p-2 p-4'>
            <MDEditor.Markdown
              className='mobile:!text-sm'
              source={eventData.description}
            />
          </div>
        </div>

        <div className='mobile:w-full mobile:mt-8 w-[310px]'>
          <div className='border-t border-dashed border-border'>
            {eventData.ticketOptions.map(ticket => (
              <TicketBox key={ticket.id} ticket={ticket} />
            ))}
          </div>

          <div className='py-6'>
            <p className='tablet:text-base text-lg'>주최자 연락처</p>
            <div className='tablet:mt-2 tablet:text-xs mt-4 rounded-md bg-gray-100 px-2 py-3 text-sm text-gray-500'>
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
