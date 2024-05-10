import { Link } from 'react-router-dom';

import OAuthLogin from '@components/auth/signin/OAuthLogin';
import SignInForm from '@components/auth/signin/SignInForm';

function SignIn() {
  return (
    <div className='tablet:py-20 mobile:min-h-[calc(100dvh-56px)] mobile:py-16 flex min-h-[calc(100dvh-64px)] w-full items-center justify-center py-24'>
      <div className='mobile:w-full w-[440px]'>
        <SignInForm />
        <Link
          to='/signup'
          className='mobile:text-xs mt-2 inline-block text-sm text-gray-500'
        >
          회원가입
        </Link>

        <OAuthLogin />
      </div>
    </div>
  );
}

export default SignIn;
