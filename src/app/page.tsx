import { TagsTable } from './components/table/tags-table';

export default async function Home() {
  return (
    <main style={{ width: '100%', height: '100%' }}>
      <TagsTable />
    </main>
  );
}
