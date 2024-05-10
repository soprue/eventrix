import { useNavigate } from 'react-router-dom';

import { Button } from '@components/ui/button';

import NotFoundImage from '@assets/images/taken_illustration.svg';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='mobile:h-[calc(100dvh-56px)] flex h-[calc(100dvh-64px)] w-full justify-center'>
      <div className='mobile:max-w-[270px] tablet:max-w-[350px] flex w-full max-w-[400px] flex-col items-center justify-center gap-24'>
        <img
          src={NotFoundImage}
          alt='404 이미지'
          className='tablet:w-72 mobile:w-52 w-80'
        />
        <div className='mobile:gap-2 flex w-full flex-col items-center gap-4'>
          <p className='mobile:text-lg text-2xl font-semibold'>
            페이지를 찾을 수 없습니다.
          </p>
          <Button
            className='mobile:font-normal w-full'
            onClick={() => navigate('/')}
          >
            메인페이지로 이동하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
