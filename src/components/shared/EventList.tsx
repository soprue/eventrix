import EventBox from './EventBox';
import NoData from './NoData';

import { EventType } from '@/types/event';

interface EventListProps {
  events: EventType[];
}

function EventList({ events }: EventListProps) {
  return (
    <>
      {events.length === 0 ? (
        <NoData />
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
