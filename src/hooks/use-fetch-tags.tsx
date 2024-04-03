import { getAllTags } from '@/actions/get-all-tags';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchTags = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getAllTags(),
    retry: 1,
  });

  const initialData = useMemo(() => [], []);

  return {
    data: data?.items ?? initialData,
    error,
    isError,
    isLoading,
  };
};
