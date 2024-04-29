import { useQuery, useQueryClient } from 'react-query';

import { EventType } from '@/types/event';
import { getEvent } from '@services/eventService';

function useEventDetail(id: string) {
  const queryClient = useQueryClient();
  return useQuery<EventType>(['event', id], () => getEvent(id!), {
    initialData: () => {
      return queryClient.getQueryData(['event', id]);
    },
  });
}

export default useEventDetail;
