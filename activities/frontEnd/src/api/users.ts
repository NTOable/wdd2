import { apiClient } from './client';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { current_page: number; last_page: number; total: number; per_page: number };
}

export const usersApi = {
  list: (page = 1): Promise<PaginatedResponse<User>> =>
    apiClient.get(`/users?page=${page}`).then((r) => r.data),

  get: (id: number): Promise<User> =>
    apiClient.get(`/users/${id}`).then((r) => r.data.data),

  create: (payload: CreateUserPayload): Promise<User> =>
    apiClient.post('/users', payload).then((r) => r.data.data),

  update: (id: number, payload: Partial<CreateUserPayload>): Promise<User> =>
    apiClient.put(`/users/${id}`, payload).then((r) => r.data.data),

  destroy: (id: number): Promise<void> =>
    apiClient.delete(`/users/${id}`).then(() => undefined),
};