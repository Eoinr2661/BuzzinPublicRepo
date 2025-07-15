import type { Post } from "../../types/post.types";

export const fetchPostById = async (id: string): Promise<Post> => {
  try {
    const response = await fetch(`${__BACKEND_URL__}/api/v1/posts/id/${id}`);
    if (!response.ok) {
      throw new Error('Post not found');
    }
    const post: Post = await response.json();
    return post;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
};
