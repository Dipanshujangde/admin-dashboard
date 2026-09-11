import api from './axiosInstance';
import type { Visitor, VisitorFormValues } from '@/types/visitor';

export const visitorApi = {
  getAll: async (): Promise<Visitor[]> => {
    const { data } = await api.get<Visitor[]>('/visitors');
    return data;
  },

  getById: async (id: string): Promise<Visitor> => {
    const { data } = await api.get<Visitor>(`/visitors/${id}`);
    return data;
  },

  create: async (payload: VisitorFormValues): Promise<Visitor> => {
    const { data } = await api.post<Visitor>('/visitors', payload);
    return data;
  },

  update: async (id: string, payload: Partial<VisitorFormValues>): Promise<Visitor> => {
    const { data } = await api.put<Visitor>(`/visitors/${id}`, payload);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/visitors/${id}`);
  },

  approve: async (id: string): Promise<Visitor> => {
    const { data } = await api.patch<Visitor>(`/visitors/${id}/approve`);
    return data;
  },

  reject: async (id: string): Promise<Visitor> => {
    const { data } = await api.patch<Visitor>(`/visitors/${id}/reject`);
    return data;
  },
};
