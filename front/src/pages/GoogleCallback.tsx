import { api } from '@/lib/api';
import { Loader2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

export function GoogleCallback() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.post(
          '/auth/google',
          { code },
        );

        console.log(data);
      } catch {
        toast.error('Credenciais inválidas');
        // navigate to signin...
      }
    }

    load();
  }, [code]);

  return (
    <div className="flex items-center gap-2">
      <Loader2Icon className="size-7 animate-spin" />
      <h1 className="text-3xl tracking-tight font-semibold">Carregando...</h1>
    </div>
  );
}
