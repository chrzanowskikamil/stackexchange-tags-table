import { API_BASE_URL, API_KEY, MAX_PAGE_LIMIT, MAX_PAGE_SIZE } from '@/utils';
import { TagItem, TagsResponse } from '@/types/tags-response';

export async function getAllTags(pageSize: number = MAX_PAGE_SIZE): Promise<TagItem[]> {
  let allTags: TagItem[] = [];
  let hasMore = true;
  let page = 1;

  while (hasMore && page <= MAX_PAGE_LIMIT) {
    try {
      const response = await fetch(`${API_BASE_URL}?page=${page}&pagesize=${pageSize}&site=stackoverflow&key=${API_KEY}`);

      if (!response.ok) {
        console.error(`API call failed with status: ${response.status} and message: ${response.statusText}`);
        break;
      }

      const data: TagsResponse = await response.json();
      const tagsWithCountAndName = data.items.map((tag) => ({ count: tag.count, name: tag.name }));
      allTags = [...allTags, ...tagsWithCountAndName];

      hasMore = data.has_more;
      page++;
    } catch (error) {
      console.error(`An error occurred while fetching tags: ${error}`);
      break;
    }
  }

  return allTags;
}
