import type { Post } from "../../../types/post.types";

type Props = {
  post: Post;
  fallBackImage: string;
  stripHtmlTags: (html: string) => string;
};

const FeaturedPost: React.FC<Props> = ({ post, fallBackImage, stripHtmlTags }) => {
  return (

      <a

        href={`/posts/${post.id}`}
        rel="noopener noreferrer"
        className="justify-items-center md:justify-items-start flex flex-col md:flex-row my-6 gap-6 items-start w-full"
      >
        <div className='h-48 md:h-72 w-auto'>
          <img
            src={post.featuredMediaUrl || fallBackImage}
            alt={post.title || 'Featured post'}
            className="w-auto h-full object-cover object-top-left rounded-xl hover:opacity-90 transition"
          />
        </div>



        <div className="flex flex-col justify-between text-left md:w-7/12 h-full">

          <div>
            <h2 className="text-2xl font-Montserrat-VariableFont text-gray-800 font-bold line-clamp-2">
              {stripHtmlTags(post.title)}
            </h2>
            <div className="text-base font-Montserrat-VariableFont text-gray-800 line-clamp-2 md:line-clamp-4">
              {stripHtmlTags(post.excerpt)}
            </div>
          </div>

          <div className="mt-4">
            <a
              href={`/posts/${post.id}`}
              className="text-buzzin-purple-500 font-semibold hover:underline"
            >
              Read more →
            </a>
          </div>

        </div>
      </a>
  );
};

export default FeaturedPost;
