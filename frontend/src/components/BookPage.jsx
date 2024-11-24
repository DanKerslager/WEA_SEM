import { useEffect, useState } from 'react';
import { useColorModeValue, Box, Button, Center } from '@chakra-ui/react';
import Filter from './Filter';
import BookList from './BookList';
import { fetchBooks } from '../api';
import {
  onTitleOnChange,
  onAuthorsOnChange,
  onCategoriesOnChange,
  onIsbnOnChange,
} from '../filter';
import { useAuth } from '../providers/AuthProvider';

const BookPage = ({ setBookId, setBookDetail }) => {
  const lastPage = localStorage.getItem('lastPage');
  const onFavorites = localStorage.getItem('onFavorites');
  const onRated = localStorage.getItem('onRated');
  const storedFavoriteBooks = localStorage.getItem('favoriteBooks');

  const lastIsbn = localStorage.getItem('lastIsbn');
  const lastAuthors = localStorage.getItem('lastAuthors');
  const lastCategories = localStorage.getItem('lastCategories');
  const lastTitle = localStorage.getItem('lastTitle');
  // Filtering variables for the book fetch.
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(lastPage || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [isbn, setIsbn] = useState(lastIsbn || '');
  const [authors, setAuthors] = useState(lastAuthors || '');
  const [categories, setCategories] = useState(lastCategories || '');
  const [title, setTitle] = useState(lastTitle || '');
  const [showFavorites, setShowFavorites] = useState(onFavorites || false);
  const [showRated, setShowRated] = useState(onRated === 'true' || false);

  const [showHidden, setShowHidden] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser, isAuthenticated } = useAuth();
  //const favorites = showFavorites ? user?.favoriteBooks : [];
  const [favorites, setFavorites] = useState(storedFavoriteBooks || []);
  const limit = 10;
  const colorMode = useColorModeValue('green.300', 'green.800');

  // Sync user favorites with local storage
  


  // Function to fetch books data from the backend.
  const loadBooksData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks({
        isbn,
        authors,
        categories,
        title,
        page,
        limit,
        favorites,
        showHidden,
        showRated,
        userId: user?._id,
      });
      localStorage.setItem('lastPage', page);
      localStorage.setItem('onFavorites', showFavorites);
      localStorage.setItem('favoriteBooks', favorites);
      localStorage.setItem('onRated', showRated);

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
  }, [isbn, authors, categories, title, page, showFavorites, showHidden, showRated]);

  return (
    <div id="book-page">
      <Box id="filters" bg={colorMode}>
        <Filter
          isbn={isbn}
          authors={authors}
          categories={categories}
          title={title}
          onIsbnChange={onIsbnOnChange((e) => {
            const newValue = e?.target?.value;
            localStorage.setItem('lastIsbn', newValue);
            setIsbn(newValue);
            setPage(1);
          })}
          onTitleChange={onTitleOnChange((e) => {
            const newValue = e?.target?.value;
            localStorage.setItem('lastTitle', newValue);
            setTitle(newValue);
            setPage(1);
          })}
          onAuthorChange={onAuthorsOnChange((e) => {
            const newValue = e?.target?.value;
            localStorage.setItem('lastAuthors', newValue);
            setAuthors(newValue);
            setPage(1);
          })}
          onCategoriesChange={onCategoriesOnChange((e) => {
            const newValue = e?.target?.value;
            localStorage.setItem('lastCategories', newValue);
            setCategories(newValue);
            setPage(1);
          })}
        />
      </Box>
      <div id="books">
        {isAuthenticated && (
          <div id="filter-buttons">
            <Button mr={6} colorScheme='red' onClick={() => { if (showFavorites) { setShowFavorites(false); setShowHidden(false); return } setShowFavorites(true); setShowHidden(true); setPage(1); }}>
              {showFavorites ? 'Show All Books' : 'Show Favorites Only'}
            </Button>
            <Button mr={6} colorScheme='teal' onClick={() => { setShowRated(!showRated); setPage(1); }}>
              {showRated ? 'Show All Books' : 'Show Rated Books Only'}
            </Button>
            {isTesting && (
              <Button colorScheme='teal' onClick={() => { setShowHidden(!showHidden); setPage(1); }} disabled={showFavorites === true}>
                {showHidden ? 'Show Available' : 'Show Hidden'}
              </Button>
            )}
          </div>
        )}
        {showFavorites && favorites?.length === 0 ? (
          <Center>No book has been favorited yet.</Center>
        ) : (
          <BookList
            setBookId={setBookId}
            setBookDetail={setBookDetail}
            books={books}
            loading={loading}
            error={error}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default BookPage;
