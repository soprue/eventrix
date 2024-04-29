import { useQuery } from 'react-query';

import { UserType } from '@/types/user';
import { getUserInfo } from '@services/userService';

function useOrganizerInfo(organizerUID: string) {
  return useQuery<UserType>(
    ['user', organizerUID],
    () => getUserInfo(organizerUID),
    {
      enabled: !!organizerUID,
    },
  );
}

export default useOrganizerInfo;
