import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import VisitorRow from './VisitorRow';
import type { Visitor } from '@/types/visitor';

interface VisitorTableProps {
  visitors: Visitor[];
  actioningIds: string[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (visitor: Visitor) => void;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function VisitorTable({
  visitors,
  actioningIds,
  onApprove,
  onReject,
  onDelete,
}: VisitorTableProps) {
  if (visitors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ink-700 py-16 text-center">
        <p className="text-sm font-medium text-slate-300">No visitors yet</p>
        <p className="text-xs text-slate-500">Add your first visitor to see it appear here.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop / tablet: table */}
      <div className="hidden overflow-x-auto rounded-xl border border-ink-800 sm:block">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-ink-800 bg-ink-900/80">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Name
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Phone
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Unit
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Visit date
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <VisitorRow
                key={visitor.id}
                visitor={visitor}
                isBusy={actioningIds.includes(visitor.id)}
                onApprove={onApprove}
                onReject={onReject}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-3 sm:hidden">
        {visitors.map((visitor) => {
          const isBusy = actioningIds.includes(visitor.id);
          const isPending = visitor.status === 'pending';
          return (
            <div key={visitor.id} className="rounded-xl border border-ink-800 bg-ink-900/60 p-4">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-100">{visitor.name}</p>
                  <p className="text-xs text-slate-500">{visitor.phone}</p>
                </div>
                <Badge status={visitor.status} />
              </div>
              <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
                <p>
                  Unit: <span className="text-slate-300">{visitor.unit}</span>
                </p>
                <p>
                  Visit: <span className="text-slate-300">{formatDate(visitor.visitDate)}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="success"
                  size="sm"
                  disabled={!isPending}
                  isLoading={isBusy}
                  onClick={() => onApprove(visitor.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!isPending}
                  isLoading={isBusy}
                  onClick={() => onReject(visitor.id)}
                >
                  Reject
                </Button>
                <Button variant="danger" size="sm" isLoading={isBusy} onClick={() => onDelete(visitor)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
