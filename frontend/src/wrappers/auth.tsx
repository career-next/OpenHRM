import { Navigate, Outlet } from '@umijs/max'
import { useAuth } from '@/utils/auth'

export default () => {
  const { accessToken, isLogin } = useAuth();
  if (isLogin) {
    return <Outlet />;
  } else{
    return <Navigate to="/login" />;
  }
}