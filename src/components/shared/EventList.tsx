import EventBox from './EventBox';
import NoData from './NoData';

import { EventType } from '@/types/event';

interface EventListProps {
  events: EventType[];
  cols?: number;
}

function EventList({ events, cols = 4 }: EventListProps) {
  const gridCols =
    cols === 1
      ? 'grid-cols-1'
      : cols === 2
        ? 'grid-cols-2'
        : cols === 3
          ? 'grid-cols-3'
          : 'grid-cols-4';

  return (
    <>
      {events.length === 0 ? (
        <NoData />
      ) : (
        <div
          className={`grid grid-flow-row auto-rows-auto gap-4 mobile:gap-2 ${gridCols}`}
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
