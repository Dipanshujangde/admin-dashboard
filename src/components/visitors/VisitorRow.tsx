import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import type { Visitor } from '@/types/visitor';

interface VisitorRowProps {
  visitor: Visitor;
  isBusy: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (visitor: Visitor) => void;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function VisitorRow({ visitor, isBusy, onApprove, onReject, onDelete }: VisitorRowProps) {
  const isPending = visitor.status === 'pending';

  return (
    <tr className="border-b border-ink-800 last:border-0 hover:bg-ink-800/40">
      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-100">
        {visitor.name}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-400">{visitor.phone}</td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-400">{visitor.unit}</td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-400">
        {formatDate(visitor.visitDate)}
      </td>
      <td className="whitespace-nowrap px-4 py-3">
        <Badge status={visitor.status} />
      </td>
      <td className="whitespace-nowrap px-4 py-3">
        <div className="flex items-center gap-2">
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
      </td>
    </tr>
  );
}
