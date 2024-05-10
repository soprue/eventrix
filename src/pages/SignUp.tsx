import SignUpForm from '@components/auth/signup/SignUpForm';

function SignUp() {
  return (
    <div className='tablet:py-20 mobile:min-h-[calc(100dvh-56px)] mobile:py-16 flex min-h-[calc(100dvh-64px)] w-full items-center justify-center py-24'>
      <div className='mobile:w-full w-[440px]'>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
