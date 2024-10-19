import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import BookList from './components/BookList';
import { fetchBooks } from './api';
import {onTitleOnChange, onAuthorsOnChange, onCategoriesOnChange} from './filter' 
// Main react component of the app.

const Main = () => {
  const lastPage = localStorage.getItem('lastPage')
  // Filtering variables for the book fetch.
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(() => {return lastPage || 1});
  const [totalPages, setTotalPages] = useState(1);
  const [authors, setAuthors] = useState('');
  const [categories, setCategories] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const limit = 10;
  
  // Function to fetch books data from the backend.
  const loadBooksData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchBooks({ authors, categories, title, page, limit });
      localStorage.setItem('lastPage', page);
      setBooks(data.bookArray);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooksData();
  }, [authors, categories, title, page]);

  return (
    <div>
      <div id="content">
        <div id="filters">
          <Filter
            onTitleChange={onTitleOnChange(e => {setTitle(e?.target?.value); setPage(1);})}
            onAuthorChange={onAuthorsOnChange((e) => {setAuthors(e?.target?.value); setPage(1);})}
            onCategoriesChange={onCategoriesOnChange((e) => {setCategories(e?.target?.value); setPage(1);})}
          />
        </div>

        <div id="books">
          <BookList books={books} loading={loading} error={error} />
        </div>
      </div>

      <div id="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
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
