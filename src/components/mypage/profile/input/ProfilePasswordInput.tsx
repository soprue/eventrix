import React from 'react';

import { Button } from '@components/ui/button';
import InputTitle from '@shared/InputTitle';

import { UserType } from '@/types/user';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';
import { resetPassword } from '@services/userService';

interface ProfilePasswordInputProps {
  user: UserType;
}

function ProfilePasswordInput({ user }: ProfilePasswordInputProps) {
  const { openAlert } = useGlobalAlertStore();

  const handleButtonClick = () => {
    if (!user) return;

    resetPassword(user.uid as string)
      .then(result => {
        if (result.success) {
          openAlert(
            '비밀번호 변경을 위한 이메일이 발송되었습니다.',
            '메일함을 확인해 주세요.',
          );
        } else {
          openAlert('오류가 발생했습니다.', result.error as string);
        }
      })
      .catch(error => {
        openAlert('오류가 발생했습니다.', error);
      });
  };

  return (
    <div className='flex flex-col space-y-2'>
      <InputTitle title='비밀번호' />

      <Button type='button' onClick={handleButtonClick}>
        비밀번호 변경
      </Button>
    </div>
  );
}

export default React.memo(ProfilePasswordInput);
