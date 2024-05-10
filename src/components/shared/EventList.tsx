import EventBox from './EventBox';
import NoData from './NoData';

import { EventType } from '@/types/event';

interface EventListProps {
  events: EventType[];
  cols?: number;
}

function EventList({ events, cols = 4 }: EventListProps) {
  return (
    <>
      {events.length === 0 ? (
        <NoData />
      ) : (
        <div
          className={`grid grid-flow-row auto-rows-auto gap-4 grid-cols-${cols}`}
          data-cy='event-list'
        >
          {events.map(event => (
            <EventBox key={event.uid} event={event} />
          ))}
        </div>
      )}
    </>
  );
}

export default EventList;
