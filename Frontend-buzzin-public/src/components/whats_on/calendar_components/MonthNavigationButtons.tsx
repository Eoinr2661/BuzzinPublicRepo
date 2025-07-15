import type { MonthNavigationProps } from "../../../../types/post.types";

export const MonthNavigation = ({ prevMonth, nextMonth }: MonthNavigationProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={prevMonth}
        aria-label="Previous Month"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-black shadow transition text-2xl"
      >
        ←
      </button>
      <button
        onClick={nextMonth}
        aria-label="Next Month"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-black shadow transition text-2xl"
      >
        →
      </button>
    </div>
  );
};
