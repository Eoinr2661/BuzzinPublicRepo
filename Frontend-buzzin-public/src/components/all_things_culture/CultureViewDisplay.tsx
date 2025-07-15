import { useEffect, useState } from 'react';
import { fetchPosts } from '../../api/fetchPostsPaginated';
import Pagination from '../ui/Pagination';
import LoaderScreenHeight from '../ui/LoaderScreenHeight';
import { stripHtmlTags } from '../../utils/StripHTMLTags';
import FeaturedPost from './FeaturedPost';
import type { Post } from '../../../types/post.types'
import PageTitle from '../ui/PageTitle';
import PostCard from './PostCard';


const CultureViewDisplay = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 13;

  useEffect(() => {
    setLoading(true);
    fetchPosts({ page: page - 1, perPage, sortBy: 'publishedAt', order: 'desc' })
      .then(({ data, totalPages }) => {
        setPosts(data);
        setTotalPages(totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) {
    return (
      <LoaderScreenHeight text='Loading Posts...' />
    );
  }

  return (
    <div className="flex flex-col">
      <main className="min-h-screen flex flex-col text-center items-start mx-10 md:mx-16 lg:mx-28 mt-10">
        <PageTitle title="All Things Culture" />
        <FeaturedPost
          post={posts[0]}
          fallBackImage={"/images/buzzinTitle.png"}
          stripHtmlTags={stripHtmlTags}
        />

        <section className="justify-items-center md:justify-items-start posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8 gap-6">
          {posts.slice(1).map((post) => (
            <PostCard key={post.id} post={post} fallBackImage={"/images/buzzinTitle.png"} />
          ))}
        </section>

      </main>
      <Pagination
        currentPage={page - 1}
        totalPages={Math.max(0, totalPages - 1)}
        onPageChange={(newPage) => setPage(newPage + 1)}
      />
    </div>
  );
};

export default CultureViewDisplay;
