export interface TagItem {
  count: number;
  name: string;
}

export interface TagsResponse {
  items: TagItem[];
  has_more: boolean;
  error_id?: number;
  error_message?: string;
  error_name?: string;
}
