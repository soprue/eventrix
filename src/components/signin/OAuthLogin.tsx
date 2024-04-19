import { FcGoogle } from 'react-icons/fc';

function OAuthLogin() {
  return (
    <div>
      <div className="mt-8 mb-6 flex items-center before:flex-1 before:border-t before:border-line-normal after:flex-1 after:border-t after:border-line-normal ">
        <p className="mx-4 text-center text-sm text-text-alternative">
          간편 로그인
        </p>
      </div>

      <div className="flex justify-center gap-6">
        <div className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border">
          <FcGoogle size="25" />
        </div>
      </div>
    </div>
  );
}

export default OAuthLogin;
