import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/api/users';

export const userKeys = {
  all: ['users'] as const,
  list: (page: number) => ['users', 'list', page] as const,
  detail: (id: number) => ['users', 'detail', id] as const,
};

export const useUsers = (page = 1) =>
  useQuery({
    queryKey: userKeys.list(page),
    queryFn: () => usersApi.list(page),
  });

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.all }),
  });
};