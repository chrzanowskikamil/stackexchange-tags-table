'use client';
import { TagItem } from '@/app/page';
import { Cell, ColumnDef, Row, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ChangeEvent, FC, ReactElement, ReactNode, useMemo, useState } from 'react';
import { Box, Paper, Table as MuiTable, TableCell, TableHead, TableRow, TableBody, Skeleton, Pagination } from '@mui/material';

interface TableProps {
  data: TagItem[];
  columns: ColumnDef<any>[];
  isFetching: boolean;
  skeletonCount?: number;
  skeletonHeight?: number;
  headerComponent?: JSX.Element;
  pageCount: number;
  page?: (page: number) => void;
  onClickRow?: (cell: Cell<any, unknown>, row: Row<any>) => void;
  children?: ReactNode | ReactElement;
  handleRow?: () => void;
}

export const Table: FC<TableProps> = ({ data, columns, isFetching, skeletonCount = 10, skeletonHeight = 28, headerComponent, pageCount, page, onClickRow, children, handleRow }) => {
  const [paginationPage, setPaginationPage] = useState(1);
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedHeaderComponent = useMemo(() => headerComponent, [headerComponent]);

  console.log(data);

  const { getHeaderGroups, getRowModel, getAllColumns } = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
  });

  const skeletons = Array.from({ length: skeletonCount }, (_, index) => index);

  const columnCount = getAllColumns().length;

  //   const noDataFound = !isFetching && memoizedData.length === 0;

  const handlePageChange = (event: ChangeEvent<unknown>, currentPage: number) => {
    setPaginationPage(currentPage === 0 ? 1 : currentPage);
    page?.(currentPage === 0 ? 1 : currentPage);
  };

  return (
    <Paper>
      <Box>{memoizedHeaderComponent && <Box>{memoizedHeaderComponent}</Box>}</Box>
      <Box>
        <MuiTable>
          {!isFetching && (
            <TableHead>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
          )}
          <TableBody>
            {!isFetching ? (
              getRowModel()?.rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={handleRow}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      onClick={() => onClickRow?.(cell, row)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                {skeletons.map((skeleton) => (
                  <TableRow key={skeleton}>
                    {Array.from({ length: columnCount }, (_, index) => index).map((element) => (
                      <TableCell
                        key={element}
                        sx={{ height: skeletonHeight }}>
                        <Skeleton height={skeletonHeight} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </MuiTable>
      </Box>
      {pageCount && page && (
        <Pagination
          count={pageCount}
          page={paginationPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      )}
    </Paper>
  );
};
