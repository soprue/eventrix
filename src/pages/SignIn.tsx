import { Link } from 'react-router-dom';

import OAuthLogin from '@components/auth/signin/OAuthLogin';
import SignInForm from '@components/auth/signin/SignInForm';

function SignIn() {
  return (
    <div className="w-full flex justify-center items-center min-h-[calc(100dvh-64px)] py-24">
      <div className="w-[440px]">
        <SignInForm />
        <Link to="/signup" className="text-sm text-gray-500 mt-2 inline-block">
          회원가입
        </Link>

        <OAuthLogin />
      </div>
    </div>
  );
}

export default SignIn;
