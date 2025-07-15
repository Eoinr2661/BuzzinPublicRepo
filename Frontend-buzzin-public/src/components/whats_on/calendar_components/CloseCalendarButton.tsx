import type { CloseCalendarButtonProps } from "../../../../types/post.types";

export const CloseCalendarButton = ({ onClick }: CloseCalendarButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Close calendar"
      className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
    >
      &times;
    </button>
  );
};