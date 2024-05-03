import { Button } from '@components/ui/button';
import InputTitle from '@shared/InputTitle';

function ProfilePasswordInput() {
  return (
    <div className='flex flex-col space-y-2'>
      <InputTitle title='비밀번호' />

      <Button>비밀번호 변경</Button>
    </div>
  );
}

export default ProfilePasswordInput;
