import { useQueryClient } from 'react-query';
import { getEvent } from '@services/eventService';

function usePrefetchEvent() {
  const queryClient = useQueryClient();

  const prefetchEvent = (eventId: string) => {
    queryClient.prefetchQuery(['event', eventId], () => getEvent(eventId));
  };

  return prefetchEvent;
}

export default usePrefetchEvent;
