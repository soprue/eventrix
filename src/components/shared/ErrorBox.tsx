import errorImage from '@assets/images/error_illustration.svg';

function ErrorBox() {
  return (
    <div className='flex min-h-[calc(100dvh-64px)] w-full flex-col items-center justify-center'>
      <img src={errorImage} alt='오류 이미지' className='mb-16 w-1/4' />
      <p className='text-center text-lg font-medium'>
        오류가 발생했습니다.
        <br />
        다시 시도해 주세요.
      </p>
    </div>
  );
}

export default ErrorBox;
