import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxVisiblePages = 6;
  const startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);
  const visiblePages = [];
  const { t } = useTranslation();

  if (totalPages <= 1) {
    return (
      <div className="pagination">
        <Button colorScheme="teal" disabled>
          1
        </Button>
      </div>
    );
  }
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <div className="pagination">
      {/* Previous Button */}
      <Button
        mr={1}
        colorScheme='teal'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
      {t('previous')}
      </Button>
      <Button
        mr={1}
        colorScheme='teal'
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
      1
      </Button>
      {/* Ellipsis after the first page if necessary */}
      {startPage > 2 && <span>...</span>}
      {/* Page Number Buttons */}
      {visiblePages.map((page) => (
        <Button
          mr={1}
          colorScheme='teal'
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </Button>
      ))}

      {/* Ellipsis*/}
      {endPage < totalPages - 1 && <span>...</span>}

      {/* Last Page Button */}
      {endPage < totalPages && (
        <Button ml={1} mr={1} colorScheme='teal' onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
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
        {t('next')}
      </Button>
    </div>
  );
};

export default Pagination;
