import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/common/Loader';
import Badge from '@/components/common/Badge';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchVisitors } from '@/store/slices/visitorSlice';

const statCards = [
  { key: 'total', label: 'Total visitors', accent: 'text-slate-100' },
  { key: 'pending', label: 'Pending review', accent: 'text-brass-400' },
  { key: 'approved', label: 'Approved', accent: 'text-sage-400' },
  { key: 'rejected', label: 'Rejected', accent: 'text-rust-400' },
] as const;

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.visitors);

  useEffect(() => {
    dispatch(fetchVisitors());
  }, [dispatch]);

  const counts = useMemo(
    () => ({
      total: items.length,
      pending: items.filter((v) => v.status === 'pending').length,
      approved: items.filter((v) => v.status === 'approved').length,
      rejected: items.filter((v) => v.status === 'rejected').length,
    }),
    [items]
  );

  const recent = useMemo(
    () =>
      [...items]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    [items]
  );

  return (
    <DashboardLayout title="Dashboard">
      {status === 'loading' && items.length === 0 ? (
        <Loader label="Loading dashboard…" />
      ) : status === 'failed' && items.length === 0 ? (
        <div className="rounded-xl border border-rust-500/30 bg-rust-500/10 p-6 text-sm text-rust-400">
          {error ?? 'Something went wrong while loading the dashboard.'}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => (
              <div
                key={card.key}
                className="rounded-xl border border-ink-800 bg-ink-900 p-5"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {card.label}
                </p>
                <p className={`mt-2 text-3xl font-semibold ${card.accent}`}>
                  {counts[card.key]}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-ink-800 bg-ink-900">
            <div className="flex items-center justify-between border-b border-ink-800 px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-100">Recent visitor entries</h2>
              <Link to="/visitors" className="text-xs font-medium text-brass-400 hover:text-brass-300">
                View all →
              </Link>
            </div>
            {recent.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-slate-500">No visitor entries yet.</p>
            ) : (
              <ul className="divide-y divide-ink-800">
                {recent.map((visitor) => (
                  <li key={visitor.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-200">{visitor.name}</p>
                      <p className="text-xs text-slate-500">
                        Unit {visitor.unit} · {visitor.phone}
                      </p>
                    </div>
                    <Badge status={visitor.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
