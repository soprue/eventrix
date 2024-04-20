import SignUpForm from '@components/auth/signup/SignUpForm';

function SignUp() {
  return (
    <div className="w-full flex justify-center items-center min-h-[calc(100dvh-64px)] py-24">
      <div className="w-[440px]">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
