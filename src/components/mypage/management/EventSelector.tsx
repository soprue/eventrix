import { Dispatch, SetStateAction } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

import useMyEvents from '@hooks/useMyEvents';

interface EventSelectorProps {
  setSelectedEvent: Dispatch<SetStateAction<string | null>>;
}

function EventSelector({ setSelectedEvent }: EventSelectorProps) {
  const { data, isLoading } = useMyEvents();

  return (
    <Select onValueChange={value => setSelectedEvent(value)}>
      <SelectTrigger className='h-14 w-full text-base font-semibold mobile:h-12 mobile:text-sm'>
        <SelectValue placeholder='이벤트를 선택하세요.' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {!isLoading &&
            data?.map(event => (
              <SelectItem key={event.uid} value={event.uid!}>
                {event.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default EventSelector;
