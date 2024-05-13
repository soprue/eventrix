import { Outlet } from 'react-router-dom';

import Header from '@components/layout/Header';
import MyNavigation from '@components/mypage/MyNavigation';

function MyPageLayout() {
  return (
    <div className='relative min-h-dvh overflow-hidden font-pretendard'>
      <Header />

      <div className='container flex mobile:flex-col'>
        <MyNavigation />
        <div className='min-h-[calc(100dvh-64px)] w-[calc(100%-200px)] py-10 pl-10 tablet:w-[calc(100%-180px)] tablet:px-6 tablet:py-8 mobile:min-h-fit mobile:w-full mobile:py-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MyPageLayout;
