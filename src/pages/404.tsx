import { useNavigate } from 'react-router-dom';

import { Button } from '@components/ui/button';

import NotFoundImage from '@assets/images/taken_illustration.svg';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='flex h-[calc(100dvh-64px)] w-full justify-center'>
      <div className='flex w-full max-w-[400px] flex-col items-center justify-center gap-24'>
        <img src={NotFoundImage} alt='404 이미지' className='w-80' />
        <div className='flex w-full flex-col items-center gap-4'>
          <p className='text-2xl font-semibold'>페이지를 찾을 수 없습니다.</p>
          <Button className='w-full' onClick={() => navigate('/')}>
            메인페이지로 이동하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
