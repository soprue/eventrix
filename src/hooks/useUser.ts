import { useUserStore } from '@store/useUserStore';

function useUser() {
  return useUserStore(state => state.user);
}

export default useUser;
