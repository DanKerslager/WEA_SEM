import React from 'react';
import books from './bookCatalog.books.json';

const loadBooks = () => {
  return (
    <div>
      {books.map(book => (
        <main key={book.id}>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Year: {book.year}</p>
          <p>Pages: {book.pages}</p>
        </main>
      ))}
    </div>
  );
};

export default loadBooks;