import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

import { signInWithGoogle } from '@services/userService';
import { useUserStore } from '@store/useUserStore';

function OAuthLogin() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithGoogle().then((user) => {
      if (user) {
        useUserStore.getState().setUser(user);
        navigate('/');
      }
    });
  };

  return (
    <div>
      <div className="mt-8 mb-6 flex items-center before:flex-1 before:border-t before:border-line-normal after:flex-1 after:border-t after:border-line-normal ">
        <p className="mx-4 text-center text-sm text-text-alternative">
          간편 로그인
          <br />
          (간편 로그인으로 회원가입 시 '참여자' 유형으로만 가입됩니다.)
        </p>
      </div>
      <div className="flex justify-center gap-6">
        <div
          onClick={handleGoogleLogin}
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border"
        >
          <FcGoogle size="25" />
        </div>
      </div>
    </div>
  );
}

export default OAuthLogin;
