import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { auth, db } from './firebaseConfig';
import resizeAndConvertImage from '@utils/resizeAndConvertImage';
import { UserType } from '@/types/User';

const DEFAULT_IMAGE_URL =
  'https://firebasestorage.googleapis.com/v0/b/eventrix-7cf95.appspot.com/o/profileImages%2Fdefault_user.webp?alt=media&token=c0f074c4-5011-44a0-b0d8-db76b07cfba5';

// 프로필 이미지를 Storage에 저장하고 URL을 반환하는 함수
async function uploadProfileImage(imageFile: Blob, userId: string) {
  const storage = getStorage();
  const storageRef = ref(storage, `profileImages/${userId}.webp`);

  const webpImage = await resizeAndConvertImage(imageFile);
  await uploadBytes(storageRef, webpImage);

  return getDownloadURL(storageRef);
}

export const signInWithGoogle = async (): Promise<UserType> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Firestore 문서 참조
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    let profileImageUrl = DEFAULT_IMAGE_URL;

    // Firestore에 사용자 정보가 없으면 새로 저장
    if (!docSnap.exists()) {
      if (user.photoURL) {
        const imageFile = await fetch(user.photoURL).then((res) => res.blob());
        profileImageUrl = await uploadProfileImage(imageFile, user.uid);
      }

      await setDoc(userRef, {
        uid: user.uid,
        nickname: user.displayName,
        profileImage: profileImageUrl,
        userType: 'buyer',
        loginType: 'google',
      });
    } else {
      profileImageUrl = docSnap.data().profileImage;
    }

    return {
      uid: user.uid,
      nickname: user.displayName,
      profileImage: profileImageUrl,
      userType: 'buyer',
      loginType: 'google',
    };
  } catch (error) {
    console.error('Google 로그인 실패:', error);
    return {
      uid: null,
      nickname: null,
      userType: null,
      loginType: null,
    };
  }
};
