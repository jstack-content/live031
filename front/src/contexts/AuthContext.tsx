import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { toast } from 'sonner';

interface IAuthContextValue {
  signedIn: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
}

const AuthContext = createContext({} as IAuthContextValue);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);

  const signInWithGoogle = useCallback(() => {
    setSignedIn(true);
    toast.info('Entrar com o Google!');
  }, []);

  const signOut = useCallback(() => {
    setSignedIn(false);
    toast.info('Sair!');
  }, []);

  const value = useMemo<IAuthContextValue>(() => ({
    signedIn,
    signInWithGoogle,
    signOut,
  }), [signedIn, signInWithGoogle, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
