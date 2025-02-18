import { deleteMovieQuery } from '@api/queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteMovieQuery = () => {
  const queryClient = useQueryClient();
  const {
    data,
    mutate: deleteMovie,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: deleteMovieQuery,
    onSettled: async (_, error, __) => {
      if (error) {
        console.log('Error:', error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['moviesList'] });
      }
    },
  });

  return { data, deleteMovie, isSuccess, isError };
};
