'use client';

import { TagItem } from '../page';

interface TableProps {
  tags: TagItem[];
}

export const Table = ({ tags }: TableProps) => {
  const tagsTable = tags.map((tag) => (
    <tr key={tag.name}>
      <td>{tag.name}</td>
      <td>{tag.count}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>{tagsTable}</tbody>
    </table>
  );
};
