import { useUserStore } from '@store/useUserStore';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function PublicRoute() {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  // 로그인된 사용자가 접근 시 리다이렉트
  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
