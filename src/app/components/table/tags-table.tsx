'use client';

import { useQuery } from '@tanstack/react-query';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { Table } from './table';
import { Columns } from './table-header';
import { getTags } from '@/app/get-tags';

export const TagsTable = () => {
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesCount, setTotalPagesCount] = useState(1);
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['tags'], queryFn: () => getTags() });

  console.log(data);

  const hadlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const table = useReactTable({
    data: data?.items ?? [],
    columns: Columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table
      data={data?.items ?? []}
      columns={Columns}
      isFetching={isLoading}
      pageCount={totalPagesCount}
      page={hadlePageChange}
    />
  );
};
