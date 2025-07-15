import type { MoreButtonProps } from "../../../types/post.types";

const MoreButton = ({ href, text }: MoreButtonProps) => {
  return (
    <div className="w-full mx-auto">
      <a
        href={href}
        className="inline-block max-w-[180px] py-2 px-8 mb-6 bg-buzzin-purple-500 text-white rounded-md hover:bg-buzzin-purple-700 transition font-Montserrat-VariableFont font-semibold"
      >
        {text}
      </a>
    </div>

  );
};

export default MoreButton;
