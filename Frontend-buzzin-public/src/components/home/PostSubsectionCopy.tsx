import { useState, useEffect } from "react";

import type { PostSubSectionProps } from "../../../types/post.types";

const PostsSubSection = ({ posts }: PostSubSectionProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const displayedPosts = isMobile ? posts.slice(0, 2) : posts;

  return (
    <div className="py-4 pt-8 mx-10 md:mx-16 lg:mx-28 flex flex-col justify-start">
      <h1 className="text-buzzin-purple-500 font-Montserrat-VariableFont font-bold text-3xl md:text-4xl mb-6 text-left px-4 md:px-0">
        All Things Culture
      </h1>

      <div className="posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 gap-6">
        {displayedPosts.map((post, index) => {
          const imageUrl = post.featuredMediaUrl || "/images/buzzinTitle.png";
          const altText = post.title || "Post image";
          const bgColorClass = index % 2 === 0 ? "bg-buzzin-purple-500" : "bg-orange-500";

          return (
            <a
              key={post.id}
              href={`/posts/${post.id}`}
              rel="noopener noreferrer"
              className={`block p-6 ${bgColorClass} rounded-2xl hover:shadow-2xl transition max-w-[350px]`}
            >
              {imageUrl && (
                <div className="mb-4 w-full h-48 overflow-hidden rounded-2xl">
                  <img
                    src={imageUrl}
                    alt={altText}
                    className="w-full h-full object-cover object-top-left"
                  />
                </div>

              )}
              <h2
                className="text-xl text-white font-semibold mb-2 font-Montserrat-VariableFont line-clamp-2 text-left"
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
              <div
                className="text-sm text-white font-Montserrat-VariableFont line-clamp-2 text-left"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </a>
          );
        })}
      </div>

      <a
        href="/AllThingsCulture"
        className="inline-block max-w-[180px] py-2 bg-buzzin-purple-500 text-white rounded-md hover:bg-buzzin-purple-700 transition font-Montserrat-VariableFont font-semibold"
      >
        More Posts ...
      </a>
    </div>
  );
};

export default PostsSubSection;
