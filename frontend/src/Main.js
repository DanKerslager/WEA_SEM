import React from 'react';
import books from './bookCatalog.books.json';

const loadBooks = () => {
  return (
    <div>
      {books.map(book => (
        <main key={book.id}>
            <div id="bookInfo1">
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Year: {book.year}</p>
                <p>Pages: {book.pages}</p>
            </div>
            <div id="bookInfo2">
                <p>ISBN 10: 0-7111-7485-7</p>
                <p>ISBN 13: 978-3-0017-8250-2</p>
                <p>BookStock rate: 5/5</p>
                <p>Ratings: 420</p>
            </div>
            <div id="bookCover">
                <img src={require("./placeholder.png")}/>
            </div>
        </main>
      ))}
    </div>
  );
};

export default loadBooks;