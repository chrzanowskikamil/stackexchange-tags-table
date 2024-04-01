export interface TagItem {
  count: number;
  name: string;
}

export interface TagsResponse {
  items: TagItem[];
  has_more: boolean;
}
