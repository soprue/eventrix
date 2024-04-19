import { useUserStore } from '@store/useUserStore';
import { Navigate, useLocation } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
}

function PublicRoute({ children }: PublicRouteProps) {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  // 로그인된 사용자가 접근 시 리다이렉트
  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default PublicRoute;
