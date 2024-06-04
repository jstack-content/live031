import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from './components/Toaster';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './guards/AuthGuard';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';

export function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen grid place-items-center">
        <BrowserRouter>
          <Routes>
            <Route element={<AuthGuard isPrivate={false} />}>
              <Route path="/signin" element={<SignIn />} />
            </Route>

            <Route element={<AuthGuard isPrivate />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <Toaster />
    </AuthProvider>
  );
}
