'use client';

import { Cell, ColumnDef, PaginationState, Row, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { ChangeEvent, FC, Fragment, ReactElement, ReactNode, useMemo, useState } from 'react';
import { Box, Paper, Table as MuiTable, TableCell, TableHead, TableRow, TableBody, Skeleton, TablePagination } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { columns } from './table-header';
import { getAllTags } from '@/actions/get-all-tags';

const INITIAL_PAGE_INDEX = 0;
const INITIAL_PAGE_SIZE = 10;

export const Table: FC = () => {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: INITIAL_PAGE_INDEX, pageSize: INITIAL_PAGE_SIZE });

  const defaultData = useMemo(() => [], []);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getAllTags(),
    placeholderData: keepPreviousData,
  });

  const table = useReactTable({
    columns,
    data: data ?? defaultData,
    rowCount: data?.length,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <div>
      <div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30, 40]}
        component='div'
        count={table.getRowCount()}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={(event: unknown, newPage: number) => setPagination({ ...pagination, pageIndex: newPage })}
        onRowsPerPageChange={(event: ChangeEvent<HTMLInputElement>) => setPagination({ ...pagination, pageSize: parseInt(event.target.value, 10) })}
      />
    </div>
  );
};
