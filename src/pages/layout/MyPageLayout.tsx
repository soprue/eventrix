import { Outlet } from 'react-router-dom';

import Header from '@components/layout/Header';
import MyNavigation from '@components/my/MyNavigation';

function MyPageLayout() {
  return (
    <div className="min-h-dvh relative overflow-hidden font-pretendard">
      <Header />

      <div className="container flex">
        <MyNavigation />
        <div className="w-[calc(100%-200px)] pl-10 pt-10 min-h-[calc(100dvh-64px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MyPageLayout;
