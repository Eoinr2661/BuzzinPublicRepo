import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPostById } from '../../api/fetchPostById';
import LoaderScreenHeight from '../ui/LoaderScreenHeight';

import type { Post } from '../../../types/post.types';

const PostDisplay = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchPostById(id)
      .then(setPost)
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <LoaderScreenHeight text='Loading Posts...' />
    );
  }
  if (!post) return <p>Post not found.</p>;

  return (
    <main className="min-h-screen flex flex-col text-center items-start mx-10 md:mx-16 lg:mx-28 mt-10">

      <div className='my-4 md:my-10 mx-5 sm:mx-10 md:mx-15 lg:mx-30'>
        <div className='flex flex-col md:flex-row mb-6 gap-6 items-start w-full'>
          {/* Image */}
          <div className='w-full h-auto md:w-1/2'>
            <img
              src={post.featuredMediaUrl}
              alt={post.title || 'Post image'}
              className="w-full max-h-[50vh] object-cover rounded-xl"
            />
          </div>
          {/* Title, Details */}
          <div className="text-left w-full md:w-1/2">

            <h1 className="text-5xl font-bold mb-4">{post.title}</h1>

            <div className="text-base md:text-lg text-gray-800 mb-2">
              <p>
                <span className="font-bold">Written by:</span> {post.authorName}
              </p>
            </div>

            <div className="text-base md:text-lg text-gray-800 mb-2">
              <p>
                <span className="font-bold">Published on:</span>{' '}
                {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="text-base md:text-lg text-gray-800 mb-2">
              <p>
                <span className="font-bold">Categories:</span>{' '}
                {post.categories.map((c) => c.name).join(', ')}
              </p>
            </div>

          </div>
        </div>
        {/* Text Div */}
        <div className="flex flex-col gap-2 text-gray-600 my-4 leading-snug text-left justify-center" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </main>
  );
};

export default PostDisplay;
