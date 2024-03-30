import { ColumnDef } from '@tanstack/react-table';

export const Columns: ColumnDef<any, any>[] = [
  {
    accessorKey: 'tagName',
    header: 'Tag name',
    cell: (tag) => {
      return <span>{tag.row.original.name}</span>;
    },
  },
  {
    accessorKey: 'tagCount',
    header: 'Tag count',
    cell: (tag) => {
      return <span>{tag.row.original.count}</span>;
    },
  },
];
