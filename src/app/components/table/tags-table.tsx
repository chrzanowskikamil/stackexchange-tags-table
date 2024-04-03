'use client';

import { ChangeEvent, FC, useState } from 'react';
import { Alert, Box, Container, Table as MuiTable, TableCell, TableContainer, TableHead, TableRow, TableBody, Skeleton, TablePagination, useMediaQuery, useTheme } from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { PaginationState, SortingState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from './table-header';
import { INITIAL_PAGE_INDEX, INITIAL_PAGE_SIZE } from '@/utils';
import { useFetchTags } from '@/hooks/use-fetch-tags';

export const TagsTable: FC = () => {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: INITIAL_PAGE_INDEX, pageSize: INITIAL_PAGE_SIZE });
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, error, isError, isLoading } = useFetchTags();

  const table = useReactTable({
    columns,
    data,
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
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth='md'>
      <TablePagination
        component='div'
        labelRowsPerPage={isMobile ? 'Rows' : 'Rows per page:'}
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
                    {columns.map((_, columnIndex) => (
                      <TableCell key={columnIndex}>
                        <Skeleton height={20} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows.map((row) => {
                  return (
                    <TableRow
                      sx={{ ':hover': { backgroundColor: '#FAFAFA' } }}
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
      {isError && <Alert severity='error'>Ooopss, we an have Error 🤕 {error?.message}</Alert>}
    </Container>
  );
};
