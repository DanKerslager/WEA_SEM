import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxVisiblePages = 6;

  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <div className="pagination">
      {/* Previous Button */}
      <Button
        mr={1}
        colorScheme="teal"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      {/* Page Number Buttons */}
      {visiblePages.map((page) => (
        <Button
          mr={1}
          colorScheme="teal"
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </Button>
      ))}

      {/* Ellipsis*/}
      {endPage < totalPages - 1 && <span>...</span>}

      {/* Last Page Button */}
      {endPage < totalPages && (
        <Button
          mr={1}
          colorScheme="teal"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>
      )}

      {/* Next Button */}
      <Button
        mr={1}
        colorScheme="teal"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;