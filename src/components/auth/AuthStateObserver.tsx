import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore/lite';

import { UserType } from '@/types/user';
import { auth, db } from '@services/firebaseConfig';
import { useUserStore } from '@store/useUserStore';
import { useCartStore } from '@store/useCartStore';

function AuthStateObserver() {
  const { setUser } = useUserStore();
  const { clearCart } = useCartStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // 사용자가 로그인한 상태
        user
          .getIdToken()
          .then(async () => {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            setUser(userDoc.data() as UserType);
          })
          .catch(() => {
            setUser(null);
            clearCart();
          });
      } else {
        setUser(null);
        clearCart();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearCart]);

  return null;
}

export default AuthStateObserver;
