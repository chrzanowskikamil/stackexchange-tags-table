import EnhancedTable from './components/table';

export interface TagItem {
  name: string;
  count: number;
}

interface TagsResponse {
  items: TagItem[];
  has_more: boolean;
}

async function getTags(): Promise<TagsResponse> {
  const response = await fetch('https://api.stackexchange.com/2.3/tags?Y&site=stackoverflow');
  const data = await response.json();
  return data;
}

export default async function Home() {
  const tags = await getTags();
  console.log(tags);

  return <main></main>;
}
