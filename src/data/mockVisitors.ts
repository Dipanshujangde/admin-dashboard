import { Visitor } from '@/types/visitor';
export const seedVisitors: Visitor[] = [
  {
    id: 'v-1001',
    name: 'Rohit Malhotra',
    phone: '9876543210',
    unit: 'A-204',
    visitDate: '2026-09-12',
    status: 'pending',
    createdAt: '2026-09-10T09:12:00.000Z',
  },
  {
    id: 'v-1002',
    name: 'Priya Nair',
    phone: '9822011223',
    unit: 'B-101',
    visitDate: '2026-09-11',
    status: 'approved',
    createdAt: '2026-09-09T14:40:00.000Z',
  },
  {
    id: 'v-1003',
    name: 'Sanjay Verma',
    phone: '9900112233',
    unit: 'C-308',
    visitDate: '2026-09-13',
    status: 'rejected',
    createdAt: '2026-09-08T11:05:00.000Z',
  },
  {
    id: 'v-1004',
    name: 'Anita Deshmukh',
    phone: '9765432109',
    unit: 'A-102',
    visitDate: '2026-09-14',
    status: 'pending',
    createdAt: '2026-09-10T17:22:00.000Z',
  },
];

export const seedUser = {
  id: 'u-1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin' as const,
};

export const MOCK_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123',
};
