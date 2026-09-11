import type { VisitorStatus } from '@/types/visitor';

const styles: Record<VisitorStatus, string> = {
  pending: 'bg-brass-500/10 text-brass-400 border-brass-500/30',
  approved: 'bg-sage-500/10 text-sage-400 border-sage-500/30',
  rejected: 'bg-rust-500/10 text-rust-400 border-rust-500/30',
};

const labels: Record<VisitorStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
};

export default function Badge({ status }: { status: VisitorStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
