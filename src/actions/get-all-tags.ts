import { API_BASE_URL, API_KEY, MAX_PAGE_LIMIT, MAX_PAGE_SIZE } from '@/utils';
import { TagItem, TagsResponse } from '@/types/tags-response';

export async function getAllTags(pageSize: number = MAX_PAGE_SIZE): Promise<Omit<TagsResponse, 'has_more'>> {
  let allTags: TagItem[] = [];
  let hasMore = true;
  let page = 1;

  while (hasMore && page <= MAX_PAGE_LIMIT) {
    try {
      const response = await fetch(`${API_BASE_URL}?page=${page}&pagesize=${pageSize}&site=stackoverflow&key=${API_KEY}`);
      const data: TagsResponse = await response.json();

      if (data.error_message) {
        console.error(`API call failed with error message: ${data.error_message}`);
        throw new Error(data.error_message);
      }

      if (!response.ok) {
        console.error(`API call failed with status code: ${response.status}`);
        throw new Error(`API call failed with status code: ${response.status}`);
      }

      const tagsWithCountAndName = data.items.map((tag) => ({ count: tag.count, name: tag.name }));
      allTags = [...allTags, ...tagsWithCountAndName];

      hasMore = data.has_more;
      page++;
    } catch (error) {
      throw error;
    }
  }

  return {
    items: allTags,
  };
}
