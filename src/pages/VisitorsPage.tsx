import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import Modal from '@/components/common/Modal';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import VisitorForm from '@/components/visitors/VisitorForm';
import VisitorTable from '@/components/visitors/VisitorTable';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchVisitors,
  addVisitor,
  approveVisitor,
  rejectVisitor,
  deleteVisitor,
} from '@/store/slices/visitorSlice';
import type { Visitor, VisitorFormValues, VisitorStatus } from '@/types/visitor';

type StatusFilter = 'all' | VisitorStatus;

const filterTabs: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
];

export default function VisitorsPage() {
  const dispatch = useAppDispatch();
  const { items, status, error, actioningIds, isSubmitting } = useAppSelector(
    (state) => state.visitors
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [visitorPendingDelete, setVisitorPendingDelete] = useState<Visitor | null>(null);

  useEffect(() => {
    dispatch(fetchVisitors());
  }, [dispatch]);

  const filteredVisitors = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((v) => v.status === filter);
  }, [items, filter]);

  const handleAddVisitor = async (values: VisitorFormValues) => {
    const result = await dispatch(addVisitor(values));
    if (addVisitor.fulfilled.match(result)) {
      setIsFormOpen(false);
    }
  };

  const handleApprove = (id: string) => dispatch(approveVisitor(id));
  const handleReject = (id: string) => dispatch(rejectVisitor(id));

  const confirmDelete = async () => {
    if (!visitorPendingDelete) return;
    await dispatch(deleteVisitor(visitorPendingDelete.id));
    setVisitorPendingDelete(null);
  };

  return (
    <DashboardLayout title="Visitors">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg border border-ink-800 bg-ink-900 p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === tab.key
                  ? 'bg-brass-500 text-ink-950'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Button onClick={() => setIsFormOpen(true)}>+ Add visitor</Button>
      </div>

      {status === 'loading' && items.length === 0 ? (
        <Loader label="Loading visitors…" />
      ) : status === 'failed' && items.length === 0 ? (
        <div className="rounded-xl border border-rust-500/30 bg-rust-500/10 p-6 text-sm text-rust-400">
          {error ?? 'Something went wrong while loading visitors.'}
        </div>
      ) : (
        <VisitorTable
          visitors={filteredVisitors}
          actioningIds={actioningIds}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={setVisitorPendingDelete}
        />
      )}

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Add visitor">
        <VisitorForm
          isSubmitting={isSubmitting}
          submitLabel="Add visitor"
          onSubmit={handleAddVisitor}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!visitorPendingDelete}
        title="Delete visitor entry"
        message={`Are you sure you want to delete "${visitorPendingDelete?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        isLoading={!!visitorPendingDelete && actioningIds.includes(visitorPendingDelete.id)}
        onConfirm={confirmDelete}
        onCancel={() => setVisitorPendingDelete(null)}
      />
    </DashboardLayout>
  );
}
