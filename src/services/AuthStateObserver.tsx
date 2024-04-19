import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '@services/firebaseConfig';
import { useUserStore } from '@store/useUserStore';
import { UserType } from '@/types/User';

function AuthStateObserver() {
  const { setUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // 사용자가 로그인한 상태
        user
          .getIdToken()
          .then(async () => {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            setUser(userDoc.data() as UserType);
          })
          .catch((error) => {
            console.error('Token renewal error:', error);
            setUser(null);
          });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return null;
}

export default AuthStateObserver;
