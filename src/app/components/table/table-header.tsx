import { TagItem } from '@/types/tags-response';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<TagItem>[] = [
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
