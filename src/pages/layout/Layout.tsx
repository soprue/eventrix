import { Outlet } from 'react-router-dom';

import Header from '@components/layout/Header';

function Layout() {
  return (
    <div className='relative min-h-dvh overflow-hidden font-pretendard'>
      <Header />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
