import SignUpForm from '@components/auth/signup/SignUpForm';

function SignUp() {
  return (
    <div className='flex min-h-[calc(100dvh-64px)] w-full items-center justify-center py-24'>
      <div className='w-[440px]'>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
