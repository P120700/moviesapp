import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMovieQuery } from '@api/queries';
import { useState } from 'react';

export const useAddMovieQuery = () => {
  const queryClient = useQueryClient();

  const [error, setError] = useState<string | null>(null);

  const { mutate: addMovie, isSuccess } = useMutation({
    mutationFn: addMovieQuery,
    onSettled: async (data, error) => {
      if (error) {
        setError(error?.message);
        return;
      }
      if (data.error) {
        setError(`We have a problem with your request: "${data.error.code}"`);
        setError(null);
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ['moviesList'] });
    },
  });

  return { addMovie, error, isSuccess };
};
