import SignUpForm from '@/components/signup/SignUpForm';

function SignUp() {
  return (
    <div className="w-full flex justify-center items-center min-h-dvh py-24">
      <div className="w-[440px]">
        <p className="text-3xl font-bold text-center mb-12">회원가입</p>

        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
