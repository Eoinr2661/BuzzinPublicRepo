import React from 'react';
import { Link } from 'react-router-dom';
import type { PostCardProps } from '../../../types/post.types';

const PostCard: React.FC<PostCardProps> = ({ post, fallBackImage = "/images/buzzinTitle.png" }) => {
  const imageUrl = post.featuredMediaUrl || fallBackImage;
  const altText = post.title || 'Post image';

  return (
    <Link
      to={`/posts/${post.id}`}
      rel="noopener noreferrer"
      className="block rounded-2xl transition max-w-[350px] group"
    >
      <img
        src={imageUrl}
        alt={altText}
        className="mb-4 w-full h-48 object-cover rounded-2xl group-hover:shadow-xl"
      />

      <h2
        className="relative text-xl text-buzzin-purple-500 
          font-semibold mb-2 font-Montserrat-VariableFont text-left 
          line-clamp-2 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-buzzin-purple-500 after:w-0 
          after:transition-[width] after:duration-300 after:ease-in-out group-hover:after:w-full"
        dangerouslySetInnerHTML={{ __html: post.title }}
      />

      <div
        className="text-sm text-gray-900 text-left font-Montserrat-VariableFont line-clamp-2"
        dangerouslySetInnerHTML={{ __html: post.excerpt }}
      />
    </Link>
  );
};

export default PostCard;
