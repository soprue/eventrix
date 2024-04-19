import OAuthLogin from '@/components/signin/OAuthLogin';
import SignInForm from '@/components/signin/SignInForm';
import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div className="w-full flex justify-center items-center min-h-dvh">
      <div className="w-[440px]">
        <p className="text-3xl font-bold text-center mb-10">로그인</p>

        <SignInForm />
        <Link to="/signup" className="text-sm text-gray-500 mt-2 block">
          회원가입
        </Link>

        <OAuthLogin />
      </div>
    </div>
  );
}

export default SignIn;
