import { useUserStore } from '@store/useUserStore';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedTypes?: 'buyer' | 'organizer';
}

function PrivateRoute({ children, allowedTypes }: PrivateRouteProps) {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  // 로그인되어 있지 않은 경우
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // allowedTypes가 주어졌고, 현재 userType이 허용된 types에 속하지 않는 경우
  if (
    allowedTypes &&
    user.userType !== null &&
    !allowedTypes.includes(user.userType)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
