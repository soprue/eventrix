import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useUser from '@hooks/useUser';

function PublicRoute() {
  const user = useUser();
  const location = useLocation();

  // 로그인된 사용자가 접근 시 리다이렉트
  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
