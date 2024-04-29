import { EventType } from '@/types/event';
import EventBox from './EventBox';

interface EventListProps {
  events: EventType[];
}

function EventList({ events }: EventListProps) {
  return (
    <>
      {events.length === 0 ? (
        <p className='text-center'>이벤트가 없습니다.</p>
      ) : (
        <div className='grid grid-cols-4 gap-4'>
          {events.map(event => (
            <EventBox key={event.uid} event={event} />
          ))}
        </div>
      )}
    </>
  );
}

export default EventList;
