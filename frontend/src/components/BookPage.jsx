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
import { useTranslation } from 'react-i18next';



const BookPage = ({ setBookId, setBookDetail }) => {
  const lastPage = localStorage.getItem('lastPage');
  const onFavorites = localStorage.getItem('onFavorites');
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
  const [showFavorites, setShowFavorites] = useState(onFavorites ||false);
  const [showHidden, setShowHidden] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser, isAuthenticated } = useAuth();

  const favorites = showFavorites ? user?.favorites : [];
  const limit = 10;
  const colorMode = useColorModeValue('green.300', 'green.800');
  const { t } = useTranslation();


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
      });
      localStorage.setItem('lastPage', page);
      //localStorage.setItem('onFavorites', showFavorites);
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
  }, [isbn, authors, categories, title, page, showFavorites, showHidden]);

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
              {showFavorites ? t('show_all_books') : t('show_favorites_only')}
            </Button>
            {isTesting && (
              <Button colorScheme='teal' onClick={() => { setShowHidden(!showHidden); setPage(1); }} disabled={showFavorites === true}>
              {showHidden ? 'Show Available' : 'Show Hidden'}
              </Button>
            )}
            
          </div>
        )}
        {showFavorites && favorites.length === 0 ? (
          <Center>{t('no_favorite_book')}</Center>
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
