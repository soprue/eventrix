import { useNavigate } from 'react-router-dom';

import { Button } from '@components/ui/button';

import errorImage from '@assets/images/error_illustration.svg';

function ErrorBox() {
  const navigate = useNavigate();

  return (
    <div className='flex h-[calc(100dvh-64px)] w-full justify-center'>
      <div className='tablet:max-w-[350px] flex w-full max-w-[400px] flex-col items-center justify-center gap-24'>
        <img src={errorImage} alt='오류 이미지' className='tablet:w-72 w-80' />
        <div className='flex w-full flex-col items-center gap-4'>
          <p className='text-2xl font-semibold'>오류가 발생했습니다.</p>
          <Button className='w-full' onClick={() => navigate('/')}>
            메인페이지로 이동하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBox;
