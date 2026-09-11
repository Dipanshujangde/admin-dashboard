import api from './axiosInstance';
import type { LoginPayload, LoginResponse } from '@/types/auth';

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    return data;
  },
};
