import React from "react";

/**
 * Pagination component: Simple numbered pagination.
 * Props: currentPage, totalPages, onPageChange
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center space-x-2 mt-6">
      <button
        className="px-3 py-1 rounded border border-gray-300 hover:bg-indigo-600 hover:text-white disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border border-gray-300 hover:bg-indigo-600 hover:text-white ${
            page === currentPage ? "bg-indigo-600 text-white" : ""
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded border border-gray-300 hover:bg-indigo-600 hover:text-white disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
