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
    event.name.length > 20 ? event.name.slice(0, 19) + '...' : event.name;

  return (
    <div
      className='h-[320px] cursor-pointer rounded-md border border-input bg-background transition-transform duration-300 hover:translate-y-[-5px] hover:drop-shadow'
      onClick={() => navigate(`/event/${event.uid}`)}
      onMouseEnter={() => prefetchEvent(event.uid!)}
    >
      <div className='relative h-[240px] overflow-hidden'>
        {(event.status === '모집 마감' || event.status === '행사 종료') && (
          <div className='absolute rounded-br-sm bg-primary/50 px-2 py-1 text-sm text-white'>
            {event.status}
          </div>
        )}
        <img
          src={event.thumbnail as string}
          alt={event.name}
          className='size-full object-cover'
        />
      </div>
      <div className='p-3'>
        <div className='flex justify-between'>
          <p>{event.category}</p>
          <Badge variant='outline' className='gap-2 text-xs font-normal'>
            <GoHeartFill size={10} />
            {event.likesCount}
          </Badge>
        </div>
        <p className='text-lg font-bold'>{name}</p>
      </div>
    </div>
  );
}

export default EventBox;
