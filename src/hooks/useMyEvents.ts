import { useQuery } from 'react-query';

import { EventType } from '@/types/event';
import { getMyEvents } from '@services/eventService';
import useUser from '@hooks/useUser';

function useMyEvents() {
  const user = useUser();

  return useQuery<EventType[]>(
    ['myEvents', user?.uid],
    async () => {
      if (!user?.uid) {
        return [];
      }
      return await getMyEvents(user.uid);
    },
    {
      enabled: !!user && !!user.uid,
      cacheTime: 1000 * 60 * 30,
    },
  );
}

export default useMyEvents;
