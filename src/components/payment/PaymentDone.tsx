import { useNavigate } from 'react-router-dom';

import { Button } from '@components/ui/button';

import ConfirmedImage from '@assets/images/astronaut_illustration.svg';

function PaymentDone() {
  const navigate = useNavigate();

  return (
    <div
      className='mobile:h-[calc(100dvh-56px)] flex h-[calc(100dvh-64px)] w-full justify-center'
      data-cy='payment-done'
    >
      <div className='tablet:max-w-[350px] flex w-full max-w-[400px] flex-col items-center justify-center gap-24'>
        <img
          src={ConfirmedImage}
          alt='confirmed'
          className='tablet:w-72 w-80'
        />
        <div className='flex w-full flex-col items-center gap-4'>
          <p className='text-2xl font-semibold'>
            이벤트 참여 신청이 완료되었습니다.
          </p>
          <Button
            className='w-full'
            onClick={() => navigate('/mypage/tickets')}
          >
            마이페이지에서 확인하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentDone;
