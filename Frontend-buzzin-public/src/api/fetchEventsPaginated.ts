import type { EventPost, PagedResponse } from '../../types/post.types';

// paginated, category, search implemented.
// These events are returned in ASC by Start date order, i.e. closest events first. Don't have other sorting implemented atm. 

export const fetchEvents = async ({ page, perPage, searchTerm, selectedCategory}: { page: number; perPage: number; searchTerm?: string; selectedCategory?: string;}): 
Promise<{ data: EventPost[]; totalPages: number }> => {
  const baseUrl = `${__BACKEND_URL__}/api/v1/events/paged`;
  const params = new URLSearchParams({
    page: page.toString(),
    size: perPage.toString(),
    sortBy: 'startDate',
    order: 'asc',
  });

  if (searchTerm && searchTerm.trim().length > 0) {
    params.append('search', searchTerm.trim());
  }

  if (selectedCategory && selectedCategory.trim().length > 0) {
    params.append('category', selectedCategory.trim());
  }

  const fetchUrl = `${baseUrl}?${params.toString()}`;
  const res = await fetch(fetchUrl);

  if (!res.ok) throw new Error(`Failed to fetch events page ${page}`);

  const result: PagedResponse<EventPost> = await res.json();

  return {
    data: result.content,
    totalPages: result.totalPages,
  };
};
