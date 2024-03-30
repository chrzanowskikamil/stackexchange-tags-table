import { TagsTable } from './components/table/tags-table';

export interface TagItem {
  name: string;
  count: number;
}

interface TagsResponse {
  items: TagItem[];
  has_more: boolean;
}

export async function getTags(page: number): Promise<TagsResponse> {
  const response = await fetch(`https://api.stackexchange.com/2.3/tags?min=300&site=stackoverflow`);
  const data = response.json();
  return data;
}

export default async function Home() {
  return (
    <main>
      <TagsTable />
    </main>
  );
}
