import classnames from 'classnames';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  

function renderPages(currentPage: number, totalPages: number, onPageChange: (page: number) => void) {
  const pages = [];

  for (let page = 1; page <= totalPages; page++) {
    const isActive = currentPage === page;
    const pageClassNames = classnames(
      'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium',
      { 'bg-gray-200': isActive },
      { 'border-gray-500': isActive },
      { 'text-gray-500': isActive },
      { 'hover:bg-gray-100': !isActive },
      { 'hover:border-gray-300': !isActive },
      { 'hover:text-gray-700': !isActive }
    );

    pages.push(
      <li key={page}>
        <button className={pageClassNames} onClick={() => onPageChange(page)}>
          {page}
        </button>
      </li>
    );
  }

  return pages;
}
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
      <nav className="relative z-0 flex shadow-sm -space-x-px" aria-label="Pagination">
        <ul className="bg-white border border-gray-300 rounded-md divide-y divide-gray-300">
          {renderPages(currentPage, totalPages, onPageChange)}
        </ul>
      </nav>
    );
  }