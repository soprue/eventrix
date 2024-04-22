import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';

import { auth, db } from './firebaseConfig';
import { UserType } from '@/types/User';
import { SignInFormValues, SignUpFormValues } from '@/types/Form';
import resizeAndConvertImage from '@utils/resizeAndConvertImage';
import { AuthErrorMap } from '@constants/errorCodes';

const DEFAULT_IMAGE_URL =
  'https://firebasestorage.googleapis.com/v0/b/eventrix-7cf95.appspot.com/o/profileImages%2Fdefault_user.webp?alt=media&token=c0f074c4-5011-44a0-b0d8-db76b07cfba5';

// 프로필 이미지를 Storage에 저장하고 URL을 반환하는 함수
async function uploadImage(imageFile: Blob, folder: string, fileName: string) {
  const storage = getStorage();
  const storageRef = ref(storage, `${folder}/${fileName}.webp`);

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
        const imageFile = await fetch(user.photoURL).then(res => res.blob());
        profileImageUrl = await uploadImage(
          imageFile,
          'profileImages',
          user.uid,
        );
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

export const signUpWithEmail = async (data: SignUpFormValues) => {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );
    const user = result.user;

    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      nickname: data.nickname,
      email: data.email,
      phone: data.phone,
      profileImage: DEFAULT_IMAGE_URL,
      userType: data.userType,
      loginType: 'email',
    });

    return { success: true, data: result.user };
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage = Object.prototype.hasOwnProperty.call(
        AuthErrorMap,
        error.code,
      )
        ? AuthErrorMap[error.code]
        : error.code;
      return { success: false, error: errorMessage };
    } else {
      return { success: false, error: '알 수 없는 오류가 발생했습니다.' };
    }
  }
};

export const signInWithEmail = async (data: SignInFormValues) => {
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );
    return { success: true, data: result.user };
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage = Object.prototype.hasOwnProperty.call(
        AuthErrorMap,
        error.code,
      )
        ? AuthErrorMap[error.code]
        : error.code;
      return { success: false, error: errorMessage };
    } else {
      return { success: false, error: '알 수 없는 오류가 발생했습니다.' };
    }
  }
};
