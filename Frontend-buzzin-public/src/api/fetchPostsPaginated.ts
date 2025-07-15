import type { PagedResponse, Post, FetchPostsParams } from "../../types/post.types";

export const fetchPosts = async ({
  page,
  perPage,
  searchTerm,
  selectedCategory,
  sortBy = 'publishedAt',
  order = 'desc',
}: FetchPostsParams): Promise<{ data: Post[]; totalPages: number }> => {
  const baseUrl = `${__BACKEND_URL__}/api/v1/posts/paged`;
  const params = new URLSearchParams({
    page: page.toString(),
    size: perPage.toString(),
    sortBy,
    order,
  });

  if (searchTerm && searchTerm.trim().length > 0) {
    params.append('search', searchTerm.trim());
  }

  if (selectedCategory && selectedCategory.trim().length > 0) {
    params.append('category', selectedCategory.trim());
  }

  const fetchUrl = `${baseUrl}?${params.toString()}`;
  const res = await fetch(fetchUrl);

  if (!res.ok) throw new Error(`Failed to fetch posts page ${page}`);

  const result: PagedResponse<Post> = await res.json();

  return {
    data: result.content,
    totalPages: result.totalPages,
  };
};
