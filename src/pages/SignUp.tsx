import SignUpForm from '@components/auth/signup/SignUpForm';

function SignUp() {
  return (
    <div className='flex min-h-[calc(100dvh-64px)] w-full items-center justify-center py-24 tablet:py-20 mobile:min-h-[calc(100dvh-56px)] mobile:py-16'>
      <div className='w-[440px] mobile:w-full'>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
