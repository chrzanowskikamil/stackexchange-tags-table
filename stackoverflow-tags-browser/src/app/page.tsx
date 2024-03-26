import { Logo } from './components/logo';
import { Table } from './components/table';

export interface TagItem {
  name: string;
  count: number;
}

interface TagsResponse {
  items: TagItem[];
  has_more: boolean;
}

async function getTags(): Promise<TagsResponse> {
  const response = await fetch('https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow');
  const data = await response.json();
  return data;
}

export default async function Home() {
  const tags = await getTags();
  console.log(tags);

  return (
    <>
      <nav>
        <Logo />
      </nav>
      <main>
        <Table tags={tags.items} />
      </main>
    </>
  );
}
