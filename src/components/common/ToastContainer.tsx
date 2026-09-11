import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { dismiss } from '@/store/slices/notificationSlice';
import Toast from './Toast';

export default function ToastContainer() {
  const notifications = useAppSelector((state) => state.notifications.items);
  const dispatch = useAppDispatch();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {notifications.map((n) => (
        <Toast key={n.id} notification={n} onDismiss={(id) => dispatch(dismiss(id))} />
      ))}
    </div>
  );
}
