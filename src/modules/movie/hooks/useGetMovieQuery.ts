import { getMovieQuery } from '@api/queries';
import { ShortMovie } from '@src/types/movie';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetMovieQuery = (id: string | null) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['moviesItem', { id }],
    queryFn: () => getMovieQuery(id!),
    enabled: !!id,
    placeholderData: () => {
      const cachedData = (
        queryClient.getQueryData(['moviesList']) as
          | { pages: ShortMovie[] }
          | undefined
      )?.pages
        ?.flat()
        .find((movie) => movie.id == id);

      if (cachedData) {
        return cachedData;
      }
    },
  });
};
