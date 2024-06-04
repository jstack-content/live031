import qs from 'qs';
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
    const baseURL = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = qs.stringify({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: 'http://localhost:5173/callbacks/google',
      response_type: 'code',
      scope: 'email profile',
    });

    window.location.href = `${baseURL}?${options}`;
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
