import React from 'react';
//import books from './bookCatalog.books.json';

const Main = ({ books, setBooks, setPage, page, totalPages, setAuthor, setGenre }) => {
  const handlePageChange = (newPage) => {
    setPage(newPage); // Update the current page
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value); // Update author filter
    setPage(1); // Reset to page 1 when a filter changes
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value); // Update genre filter
    setPage(1); // Reset to page 1 when a filter changes
  };

  return (
    <div>
      {books.map(book => (
        <main key={book._id}>
          <div id="bookInfo1">
            <h2>{book.title}</h2>
            <p>Authors: {book.authors}</p>
            <p>Categories: {book.categories}</p>
            <p>Subtitle: {book.subtitle}</p>
            <p>Published year: {book.published_year}</p>
            <p>Pages: {book.num_pages}</p>
          </div>
          <div id="bookInfo2">
            <p>ISBN 10: {book.isbn10}</p>
            <p>ISBN 13: {book.isbn13}</p>
            <p>BookStock rate: {book.average_rating}</p>
            <p>Ratings: {book.ratings_count}</p>
            <p>Description: {book.description}</p>
          </div>
          <div id="bookCover">
            <img src={book.thumbnail} />
          </div>
        </main>
      ))}
      {/* Pagination controls */}
      <div id="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={page === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Main;