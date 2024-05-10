import { useNavigate } from 'react-router-dom';
import { GoHeartFill } from 'react-icons/go';

import { Badge } from '@components/ui/badge';

import { EventType } from '@/types/event';
import usePrefetchEvent from '@hooks/usePrefetchEvent';

interface EventBoxProps {
  event: EventType;
}

function EventBox({ event }: EventBoxProps) {
  const navigate = useNavigate();
  const prefetchEvent = usePrefetchEvent();
  const name =
    event.name.length > 30 ? event.name.slice(0, 30) + '...' : event.name;

  return (
    <div
      className='tablet:h-fit mobile:min-h-[275px] tablet:min-h-[270px] h-[320px] cursor-pointer rounded-md border border-input bg-background transition-transform duration-300 hover:translate-y-[-5px] hover:drop-shadow'
      onClick={() => navigate(`/event/${event.uid}`)}
      onMouseEnter={() => prefetchEvent(event.uid!)}
      data-cy='event-box'
    >
      <div className='tablet:h-[180px] relative h-[200px] overflow-hidden'>
        <div
          className='mobile:text-sm absolute rounded-br-sm bg-primary/50 px-2 py-1 text-sm text-white'
          data-cy='event-status'
        >
          {event.status}
        </div>
        <img
          src={event.thumbnail as string}
          alt={event.name}
          className='size-full object-cover'
          data-cy='event-thumbnail'
        />
      </div>
      <div className='p-3'>
        <div className='flex justify-between'>
          <p className='tablet:text-sm mobile:text-sm' data-cy='event-category'>
            {event.category}
          </p>
          <Badge
            variant='outline'
            className='tablet:p-2 tablet:py-0.5 gap-2 text-xs font-normal'
            data-cy='event-likes-count'
          >
            <GoHeartFill size={10} />
            {event.likesCount}
          </Badge>
        </div>
        <p
          className='tablet:text-base tablet:mt-1 tablet:leading-5 mobile:font-semibold text-lg font-bold'
          data-cy='event-name'
        >
          {name}
        </p>
      </div>
    </div>
  );
}

export default EventBox;
