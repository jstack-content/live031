import { Button } from '@/components/Button';
import { GoogleIcon } from '@/components/GoogleIcon';
import { useAuth } from '@/contexts/AuthContext';

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  return (
    <Button className="gap-1" onClick={signInWithGoogle}>
      <GoogleIcon />
      Entrar com o Google
    </Button>
  );
}
