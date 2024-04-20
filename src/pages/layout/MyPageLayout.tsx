import { Outlet } from 'react-router-dom';

import Header from '@components/layout/Header';

function MyPageLayout() {
  return (
    <div className="min-h-dvh relative overflow-hidden font-pretendard">
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default MyPageLayout;
