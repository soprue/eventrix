import { useNavigate } from 'react-router-dom';

import { Button } from '@components/ui/button';

import errorImage from '@assets/images/error_illustration.svg';

function ErrorBox() {
  const navigate = useNavigate();

  return (
    <div className='flex h-[calc(100dvh-64px)] w-full justify-center mobile:h-[calc(100dvh-56px)]'>
      <div className='flex w-full max-w-[400px] flex-col items-center justify-center gap-24 tablet:max-w-[350px] mobile:max-w-[270px]'>
        <img
          src={errorImage}
          alt='오류 이미지'
          className='w-80 tablet:w-72 mobile:w-52'
        />
        <div className='flex w-full flex-col items-center gap-4 mobile:gap-2'>
          <p className='text-2xl font-semibold mobile:text-lg'>
            오류가 발생했습니다.
          </p>
          <Button
            className='w-full mobile:font-normal'
            onClick={() => navigate('/')}
          >
            메인페이지로 이동하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBox;
