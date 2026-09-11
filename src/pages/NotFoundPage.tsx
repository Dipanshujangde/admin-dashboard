import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-ink-950 text-center px-4">
      <p className="text-5xl font-bold text-brass-400">404</p>
      <h1 className="text-lg font-semibold text-slate-100">Page not found</h1>
      <p className="max-w-xs text-sm text-slate-500">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        to="/dashboard"
        className="mt-2 rounded-lg bg-brass-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-brass-400"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
