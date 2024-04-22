import { Outlet } from 'react-router-dom';

import Header from '@components/layout/Header';
import MyNavigation from '@components/my/MyNavigation';

function MyPageLayout() {
  return (
    <div className='relative min-h-dvh overflow-hidden font-pretendard'>
      <Header />

      <div className='container flex'>
        <MyNavigation />
        <div className='min-h-[calc(100dvh-64px)] w-[calc(100%-200px)] py-10 pl-10'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MyPageLayout;