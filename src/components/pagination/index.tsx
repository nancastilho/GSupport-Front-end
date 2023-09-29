import React from "react";
import classnames from "classnames";
import { Icon } from "@iconify/react";
import { PaginationProps } from "../../interface";



const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  limit = 5,
}) => {
  
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const firstIndex = Math.max(currentPage - Math.floor(limit / 2), 0);
  const lastIndex = Math.min(firstIndex + limit - 1, totalPages - 1);
  const visiblePages = pages.slice(firstIndex, lastIndex + 1);

  return (
    <nav className="flex items-center justify-center" aria-label="Pagination">
      <ul className="flex justify-center space-x-4 max-md:space-x-1">
        <li>
          <button
            className={classnames(
              "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
              {
                "cursor-not-allowed": currentPage === 1,
              }
            )}
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
            disabled={currentPage === 1}
          >
            <Icon icon={'mdi:chevron-left'}/>
          </button>
        </li>
        {visiblePages.map((page) => (
          <li key={page}>
            <button
              className={classnames(
                "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium",
                {
                  "bg-gray-400": currentPage === page,
                  "hover:bg-gray-100": currentPage !== page,
                }
              )}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className={classnames(
              "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
              {
                "cursor-not-allowed": currentPage === totalPages,
              }
            )}
            onClick={() => {
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
            disabled={currentPage === totalPages}
          >
            <Icon icon={'mdi:chevron-right'}/>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
