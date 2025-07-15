import type { PaginationProps } from "../../../types/post.types";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const maxButtons = 9;
  const pages = [];

  const current = currentPage + 1;    
  const total = totalPages + 1;       

  let startPage = Math.max(1, current - 4);
  let endPage = Math.min(total, current + 4);

  if (current <= 5) {
    startPage = 1;
    endPage = Math.min(total, maxButtons);
  } else if (current + 4 >= total) {
    endPage = total;
    startPage = Math.max(1, total - maxButtons + 1);
  }

  const addPageButton = (p: number) => (
    <button
      key={p}
      onClick={() => onPageChange(p - 1)} // Convert 1-based UI back to 0-based index
      className={`px-3 py-1 mt-4 rounded mx-1 font-semibold ${p === current ? 'bg-buzzin-purple-500 text-white' : 'bg-gray-200 hover:buzzin-purple-300'}`}
    >
      {p}
    </button>
  );

  pages.push(addPageButton(1));

  if (startPage > 2) pages.push(<span key="start-ellipsis">...</span>);

  for (let p = startPage; p <= endPage; p++) {
    if (p !== 1 && p !== total) pages.push(addPageButton(p));
  }

  if (endPage < total - 1) pages.push(<span key="end-ellipsis">...</span>);

  if (total > 1) pages.push(addPageButton(total));

  return <div className="flex justify-center mb-8 select-none">{pages}</div>;
};

export default Pagination;
