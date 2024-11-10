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
  // Filtering variables for the book fetch.
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(lastPage || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [isbn, setIsbn] = useState('');
  const [authors, setAuthors] = useState('');
  const [categories, setCategories] = useState('');
  const [title, setTitle] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHidden, setShowHidden] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useAuth();
  
  const favorites = showFavorites ? user?.favorites : [];
  const limit = 10;
  const colorMode = useColorModeValue('green.300', 'green.800');

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
          onIsbnChange={onIsbnOnChange((e) => {
            setIsbn(e?.target?.value);
            setPage(1);
          })}
          onTitleChange={onTitleOnChange((e) => {
            setTitle(e?.target?.value);
            setPage(1);
          })}
          onAuthorChange={onAuthorsOnChange((e) => {
            setAuthors(e?.target?.value);
            setPage(1);
          })}
          onCategoriesChange={onCategoriesOnChange((e) => {
            setCategories(e?.target?.value);
            setPage(1);
          })}
        />
      </Box>
      <div id="books">
        <div id="filter-buttons">
        <Button mr={6} colorScheme='red' onClick={() => {if(showFavorites){setShowFavorites(false); setShowHidden(false); return} setShowFavorites(true); setShowHidden(true);  setPage(1);}}>
          {showFavorites ? 'Show All Books' : 'Show Favorites Only'}
        </Button>
        <Button colorScheme='teal' onClick={() => {setShowHidden(!showHidden); setPage(1);}} disabled={showFavorites === true}>
          {showHidden ? 'Show Available' : 'Show Hidden'}
        </Button>
        </div>
        {showFavorites && favorites.length === 0 ? (
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
