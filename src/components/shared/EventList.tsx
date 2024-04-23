import { EventType } from '@/types/Event';
import EventBox from './EventBox';

interface EventListProps {
  events: EventType[];
}

function EventList({ events }: EventListProps) {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {events.map(event => (
        <EventBox key={event.uid} event={event} />
      ))}
    </div>
  );
}

export default EventList;
