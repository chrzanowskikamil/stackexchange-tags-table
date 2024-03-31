export interface TagItem {
  name: string;
  count: number;
}

interface TagsResponse {
  items: TagItem[];
  has_more: boolean;
}

export async function getTags(): Promise<TagsResponse> {
  const response = await fetch(`https://api.stackexchange.com/2.3/tags?site=stackoverflow`);
  const data = response.json();
  return data;
}
