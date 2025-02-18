import { getMovieQuery } from '@api/queries';
import { useQueries } from '@tanstack/react-query';

export const useGetFullInfoListQuery = (ids?: string[]) => {
  return useQueries({
    queries: (ids ?? []).map((id) => ({
      queryKey: ['moviesItem', { id }],
      queryFn: () => getMovieQuery(id!),
    })),
  });
};
