import { getListQuery } from '@api/queries';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetListQuery = () => {
  return useInfiniteQuery({
    queryKey: ['moviesList'],
    queryFn: getListQuery,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParams) => {
      if (lastPage?.data?.length === 0) {
        return undefined;
      }
      return lastPageParams + 1;
    },
    getPreviousPageParam: (__, _, firstPageParams) => {
      if (firstPageParams <= 1) {
        return undefined;
      }
      return firstPageParams - 1;
    },
  });
};
