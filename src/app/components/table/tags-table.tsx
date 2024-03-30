'use client';

import { useQuery } from '@tanstack/react-query';
import { getTags } from '../../page';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { Table } from './table';
import { Columns } from './table-header';

export const TagsTable = () => {
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesCount, setTotalPagesCount] = useState(1);
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['tags'], queryFn: () => getTags(1) });

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

//   const tagsTable = data?.items.map((tag) => (
//     <tr key={tag.name}>
//       <td>{tag.name}</td>
//       <td>{tag.count}</td>
//     </tr>
//   ));
//
//   if (isLoading) return <div>Loading...</div>;
//   if (isError)
//     return (
//       <div>
//         Error: <p>{error.message}</p>
//       </div>
//     );
//
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Count</th>
//         </tr>
//       </thead>
//       <tbody>{tagsTable}</tbody>
//     </table>
//   );
// };
