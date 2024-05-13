import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';

import { auth, db } from './firebaseConfig';
import { UserType } from '@/types/user';
import {
  ProfileFormValues,
  SignInFormValues,
  SignUpFormValues,
} from '@/types/form';
import resizeAndConvertImage from '@utils/resizeAndConvertImage';
import { AUTH_ERROR_MAP } from '@constants/errorCodes';

const DEFAULT_IMAGE_URL =
  'https://firebasestorage.googleapis.com/v0/b/eventrix-7cf95.appspot.com/o/profileImages%2Fdefault_user.webp?alt=media&token=c0f074c4-5011-44a0-b0d8-db76b07cfba5';

/**
 * 사용자의 프로필 이미지를 Firebase Storage에 업로드하고 URL을 반환합니다.
 * @param {Blob} imageFile - 업로드할 이미지 파일입니다.
 * @param {string} folder - 저장할 스토리지 폴더 경로입니다.
 * @param {string} fileName - 저장될 파일의 이름입니다.
 * @returns {Promise<string>} - 업로드된 이미지의 URL을 반환합니다.
 */
async function uploadImage(imageFile: Blob, folder: string, fileName: string) {
  const storage = getStorage();
  const storageRef = ref(storage, `${folder}/${fileName}.webp`);

  const webpImage = await resizeAndConvertImage(imageFile);
  await uploadBytes(storageRef, webpImage);

  return getDownloadURL(storageRef);
}

/**
 * Google 인증 제공자를 사용하여 로그인합니다. 로그인 성공 시 사용자 정보를 Firestore에 저장합니다.
 * @returns {Promise<UserType>} - 로그인한 사용자의 정보를 반환합니다.
 */
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
    return {
      uid: null,
      nickname: null,
      userType: null,
      loginType: null,
    };
  }
};

/**
 * 이메일과 비밀번호를 사용하여 새로운 사용자 계정을 생성하고, 사용자 정보를 Firestore에 저장합니다.
 * @param {SignUpFormValues} data - 사용자가 입력한 회원가입 정보입니다.
 * @returns {Promise<{success: boolean, data?: User, error?: string}>} - 회원가입 성공 여부와 결과 데이터 또는 에러 메시지를 반환합니다.
 */
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
        AUTH_ERROR_MAP,
        error.code,
      )
        ? AUTH_ERROR_MAP[error.code]
        : error.code;
      return { success: false, error: errorMessage };
    } else {
      return { success: false, error: '알 수 없는 오류가 발생했습니다.' };
    }
  }
};

/**
 * 이메일과 비밀번호를 사용하여 로그인합니다.
 * @param {SignInFormValues} data - 로그인 폼에서 입력된 사용자의 이메일과 비밀번호입니다.
 * @returns {Promise<{success: boolean, data?: User, error?: string}>} - 로그인 성공 여부와 사용자 데이터 또는 에러 메시지를 반환합니다.
 */
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
        AUTH_ERROR_MAP,
        error.code,
      )
        ? AUTH_ERROR_MAP[error.code]
        : error.code;
      return { success: false, error: errorMessage };
    } else {
      return { success: false, error: '알 수 없는 오류가 발생했습니다.' };
    }
  }
};

/**
 * 주어진 UID를 가진 사용자의 정보를 Firestore에서 검색합니다.
 * @param {string} uid - 검색할 사용자의 UID입니다.
 * @returns {Promise<UserType>} - 검색된 사용자의 정보를 반환합니다.
 */
export const getUserInfo = async (uid: string): Promise<UserType> => {
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);

  return docSnap.data() as UserType;
};

/**
 * 프로필 정보를 업데이트합니다.
 * @param {uid} fileName - 프로필을 업데이트할 사용자의 uid입니다.
 * @param {ProfileFormValues} data - 수정할 프로필 정보가 담긴 객체입니다.
 * @returns {Promise<{success: boolean, message?: string}>} - 프로필 업데이트 성공 여부와 메시지를 반환합니다.
 */
export async function updateProfile(uid: string, data: ProfileFormValues) {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error('사용자 정보를 찾을 수 없습니다.');
    }

    const updatedData = {
      ...(userSnap.data() as UserType),
      nickname: data.nickname,
      phone: data.phone,
      profileImage: userSnap.data().profileImage, // 기존 이미지 URL을 유지
    };

    // 프로필 이미지가 File 객체인 경우 새로운 이미지로 업데이트
    if (data.profileImage instanceof File) {
      const newImageUrl = await uploadImage(
        data.profileImage,
        'profileImages',
        uid,
      );
      updatedData.profileImage = newImageUrl;
    }

    await updateDoc(userRef, updatedData);

    return { success: true, user: updatedData };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: error };
    }
  }
}

/**
 * 지정된 사용자의 이메일 주소로 비밀번호 재설정 이메일을 보냅니다.
 * 이 함수는 Firestore에서 사용자의 UID를 참조하여 해당 사용자의 이메일을 가져온 뒤,
 * Firebase Authentication을 통해 비밀번호 재설정 이메일을 발송합니다.
 *
 * @param {string} uid - 비밀번호 재설정 이메일을 받을 사용자의 고유 식별자(UID).
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function resetPassword(uid: string) {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error('사용자 정보를 찾을 수 없습니다.');
    }

    await sendPasswordResetEmail(auth, userSnap.data().email);
    return { success: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: error };
    }
  }
}
