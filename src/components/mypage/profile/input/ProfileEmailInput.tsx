import { FcGoogle } from 'react-icons/fc';

import InputTitle from '@shared/InputTitle';

interface ProfileEmailInputProps {
  loginType: string;
  email: string | undefined;
}

function ProfileEmailInput({ loginType, email }: ProfileEmailInputProps) {
  return (
    <div className='flex flex-col space-y-2'>
      <InputTitle title='이메일' />

      {loginType === 'email' && (
        <div className='h-10 w-full overflow-hidden rounded-md border border-input px-3 py-2 text-sm'>
          {email}
        </div>
      )}
      {loginType === 'google' && (
        <div className='flex h-10 w-10 items-center justify-center rounded-full border'>
          <FcGoogle size='20' />
        </div>
      )}
    </div>
  );
}

export default ProfileEmailInput;
