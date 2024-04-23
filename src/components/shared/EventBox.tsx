import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

import { Badge } from '@components/ui/badge';

import { EventType } from '@/types/Event';
import { CATEGORIES } from '@constants/categories';

interface EventBoxProps {
  event: EventType;
}

function EventBox({ event }: EventBoxProps) {
  const navigate = useNavigate();
  const name =
    event.name.length > 20 ? event.name.slice(0, 19) + '...' : event.name;

  return (
    <div
      className='h-[320px] cursor-pointer rounded-md border border-input bg-background'
      onClick={() => navigate(`/event/${event.uid}`)}
    >
      <div className='h-[240px] overflow-hidden'>
        <img
          src={event.thumbnail as string}
          alt={event.name}
          className='size-full h-full w-full object-cover'
        />
      </div>
      <div className='p-3'>
        <div className='flex justify-between'>
          <p>{CATEGORIES[event.category]}</p>
          <Badge variant='outline' className='gap-1 text-xs font-normal'>
            <FaHeart size={10} />
            {event.likesCount}
          </Badge>
        </div>
        <p className='text-lg font-bold'>{name}</p>
      </div>
    </div>
  );
}

export default EventBox;
