import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

interface IAuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: IAuthGuardProps) {
  const { signedIn } = useAuth();

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  if (!signedIn && isPrivate) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
