import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { DoorOpenIcon } from 'lucide-react';

export function Home() {
  const { signOut } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-medium tracking-tight">
        Bem-vindo(a)!
      </h1>
      <p className="text-muted-foreground">
        Você está na área privada do sistema...
      </p>

      <Button
        className="mt-6 gap-1"
        size="sm"
        variant="outline"
        onClick={signOut}
      >
        Sair <DoorOpenIcon className="size-4" />
      </Button>
    </div>
  );
}
