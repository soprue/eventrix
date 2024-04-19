import { Outlet } from 'react-router-dom';

import Header from './Header';

function Layout() {
  return (
    <div className="min-h-screen relative overflow-hidden font-pretendard">
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
