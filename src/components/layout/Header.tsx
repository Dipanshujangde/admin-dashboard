import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { notify } from '@/store/slices/notificationSlice';
import Button from '@/components/common/Button';

export default function Header({ title }: { title: string }) {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(notify('You have been signed out.', 'info'));
    navigate('/login', { replace: true });
  };

  return (
    <header className="flex items-center justify-between border-b border-ink-800 bg-ink-900/60 px-6 py-4">
      <h1 className="text-lg font-semibold text-slate-100">{title}</h1>
      <div className="flex items-center gap-4">
        {user && (
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-200">{user.name}</p>
            <p className="text-xs capitalize text-slate-500">{user.role}</p>
          </div>
        )}
        <Button variant="secondary" size="sm" onClick={handleLogout}>
          Sign out
        </Button>
      </div>
    </header>
  );
}
