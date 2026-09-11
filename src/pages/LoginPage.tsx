import { FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login } from '@/store/slices/authSlice';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, status, error } = useAppSelector((state) => state.auth);

  if (token) {
    const redirectTo = (location.state as { from?: string })?.from ?? '/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  const validate = () => {
    const next: typeof errors = {};
    if (!email.trim()) next.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.';
    if (!password) next.password = 'Password is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-ink-800 bg-ink-900 p-8 shadow-xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brass-500 text-base font-bold text-ink-950">
            A
          </div>
          <h1 className="text-xl font-semibold text-slate-100">Sign in to Admin Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Manage visitor entries for your building</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            autoComplete="username"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete="current-password"
          />

          {error && (
            <p role="alert" className="rounded-lg border border-rust-500/30 bg-rust-500/10 px-3 py-2 text-xs text-rust-400">
              {error}
            </p>
          )}

          <Button type="submit" isLoading={status === 'loading'} className="mt-2 w-full">
            Sign in
          </Button>

          <p className="text-center text-xs text-slate-500">
            Demo credentials: admin@example.com / admin123
          </p>
        </form>
      </div>
    </div>
  );
}
