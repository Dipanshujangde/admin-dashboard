import { useEffect } from 'react';
import type { Notification } from '@/store/slices/notificationSlice';

interface ToastProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

const styleByType: Record<Notification['type'], string> = {
  success: 'border-sage-500/40 bg-sage-500/10 text-sage-400',
  error: 'border-rust-500/40 bg-rust-500/10 text-rust-400',
  info: 'border-brass-500/40 bg-brass-500/10 text-brass-400',
};

const iconByType: Record<Notification['type'], string> = {
  success: 'M5 13l4 4L19 7',
  error: 'M6 6l12 12M18 6L6 18',
  info: 'M12 8v4m0 4h.01M12 21a9 9 0 100-18 9 9 0 000 18z',
};

export default function Toast({ notification, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(notification.id), 4500);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <div
      role="alert"
      className={`flex w-80 items-start gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-md ${styleByType[notification.type]}`}
    >
      <svg className="mt-0.5 h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
        <path
          d={iconByType[notification.type]}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="flex-1 text-sm text-slate-200">{notification.message}</p>
      <button
        onClick={() => onDismiss(notification.id)}
        aria-label="Dismiss notification"
        className="text-slate-400 hover:text-slate-200"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
