export type VisitorStatus = 'pending' | 'approved' | 'rejected';

export interface Visitor {
  id: string;
  name: string;
  phone: string;
  unit: string;
  visitDate: string; 
  status: VisitorStatus;
  createdAt: string;
}

export interface VisitorFormValues {
  name: string;
  phone: string;
  unit: string;
  visitDate: string;
}

export interface VisitorFormErrors {
  name?: string;
  phone?: string;
  unit?: string;
  visitDate?: string;
}

export interface VisitorState {
  items: Visitor[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  actioningIds: string[];
  isSubmitting: boolean;
}
