import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import { EventType } from '@/types/event';
import { getEvent } from '@services/eventService';

function useEventDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  return useQuery<EventType>(['event', id], () => getEvent(id!), {
    initialData: () => {
      return queryClient.getQueryData(['event', id]);
    },
  });
}

export default useEventDetail;
