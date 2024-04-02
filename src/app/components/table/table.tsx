'use client';

import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { PaginationState, SortingState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { Box, Container, Table as MuiTable, TableCell, TableContainer, TableHead, TableRow, TableBody, Skeleton, TablePagination, useMediaQuery } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { columns } from './table-header';
import { getAllTags } from '@/actions/get-all-tags';

const INITIAL_PAGE_INDEX = 0;
const INITIAL_PAGE_SIZE = 10;

export const Table: FC = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getAllTags(),
    placeholderData: keepPreviousData,
  });

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: INITIAL_PAGE_INDEX, pageSize: INITIAL_PAGE_SIZE });
  const [sorting, setSorting] = useState<SortingState>([]);

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    columns,
    data: data ?? defaultData,
    rowCount: data?.length,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Container maxWidth='md'>
      <TablePagination
        sx={{ padding: 0, margin: 0 }}
        component='div'
        labelRowsPerPage={useMediaQuery('(max-width: 400px)') ? 'Rows' : 'Rows per page:'}
        rowsPerPageOptions={[5, 10, 20, 30, 40]}
        count={table.getRowCount()}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={(event: unknown, newPage: number) => setPagination({ ...pagination, pageIndex: newPage })}
        onRowsPerPageChange={(event: ChangeEvent<HTMLInputElement>) => setPagination({ ...pagination, pageSize: parseInt(event.target.value, 10) })}
      />
      <TableContainer sx={{ borderRadius: '4px', maxHeight: 440, border: '1px solid #E4E6E7' }}>
        <MuiTable stickyHeader>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell
                      sx={{ backgroundColor: '#F4F5F7', cursor: 'pointer', width: '200px' }}
                      title={header.column.getCanSort() ? (header.column.getNextSortingOrder() === 'asc' ? 'Sort ascending' : header.column.getNextSortingOrder() === 'desc' ? 'Sort descending' : 'Clear sorting') : undefined}
                      key={header.id}
                      colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 'bold' }}
                          onClick={header.column.getToggleSortingHandler()}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <UnfoldMoreIcon />
                        </Box>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from(new Array(INITIAL_PAGE_SIZE)).map((_, index) => (
                  <TableRow key={index}>
                    {columns.map((column, columnIndex) => (
                      <TableCell key={columnIndex}>
                        <Skeleton height={20} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows.map((row) => {
                  return (
                    <TableRow
                      sx={{ ':hover': { backgroundColor: '#fafafa' } }}
                      key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Container>
  );
};
