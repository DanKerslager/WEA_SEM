// components/BookList.js
import React from 'react';

const BookList = ({ books, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {!loading && !error && books.map(book => (
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
            <img src={book.thumbnail} alt={`${book.title} cover`} />
          </div>
        </main>
      ))}
    </div>
  );
};

export default BookList;
