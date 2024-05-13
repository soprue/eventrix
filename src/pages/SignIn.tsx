import { Link } from 'react-router-dom';

import OAuthLogin from '@components/auth/signin/OAuthLogin';
import SignInForm from '@components/auth/signin/SignInForm';

function SignIn() {
  return (
    <div className='flex min-h-[calc(100dvh-64px)] w-full items-center justify-center py-24 tablet:py-20 mobile:min-h-[calc(100dvh-56px)] mobile:py-16'>
      <div className='w-[440px] mobile:w-full'>
        <SignInForm />
        <Link
          to='/signup'
          className='mt-2 inline-block text-sm text-gray-500 mobile:text-xs'
        >
          회원가입
        </Link>

        <OAuthLogin />
      </div>
    </div>
  );
}

export default SignIn;
