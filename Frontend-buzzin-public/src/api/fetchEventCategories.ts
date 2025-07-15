import type {Category} from '../../types/post.types'

export const fetchEventCategories = async (): Promise<Category[]> => {
    const response = await fetch(`${__BACKEND_URL__}/api/v1/events/categories`);

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  return response.json();
};