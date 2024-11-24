// components/BookList.js
import {
  Card, Image, Heading, Text, Box, Center, Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SemipolarSpinner } from 'react-epic-spinners';
import { usePageContext } from '../providers/AuthProvider';
import { Rating } from 'react-simple-star-rating';
import Pagination from './Pagination';
import { setFavorite } from '../api';
import { useAuth } from '../providers/AuthProvider';
import { useState, useEffect } from 'react';
import { rateBook } from '../api';
// React module, which shows the list of books on the main page of the app.
const BookList = ({ setBookId, setBookDetail, books, loading, error, totalPages, page, setPage }) => {
  const { t } = useTranslation();
  const { user, setUser, isAuthenticated } = useAuth();
  //test
  const [rating, setRating] = useState(0)
  const setFavorites = async (bookId, isFavourite) => {
    try {
      const response = await setFavorite({ userId: user.userId, bookId, isFavorite: isFavourite });
      setUser((prevUser) => {
        const updatedFavorites = isFavourite
          ? [...prevUser.favorites, bookId]
          : prevUser.favorites.filter(favId => favId !== bookId);

        const updatedUser = { ...prevUser, favorites: updatedFavorites };
        // Update local storage after updating the user
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      });
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  }
  const giveStarRating = async (nextValue, bookId) => {
    try {
      setRating(nextValue);
      await rateBook({ user: user.userId, bookId, rating: nextValue });
    } catch (error) {
      console.error("Failed to update rating:", error);
    }
  }
  useEffect(() => {
  }
    , [rating]);


  if (loading) {
    return (
      <div id="spinner">
        <SemipolarSpinner size={200} />
      </div>
    );
  } else if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  };
  return (
    <>
      <div id="book-list">
        {!loading &&
          !error &&
          books.map((book) => (
            <Box borderRadius="lg" borderWidth="1px">
              <Box
                onClick={() => {
                  setBookDetail(true);
                  setBookId(book._id);
                  localStorage.setItem('bookId', book._id);
                }}
                id="book-card"
                //borderWidth="1px"

                overflow="hidden"
                key={book._id}
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: '100%', sm: '200px' }}
                  src={book.thumbnail}
                  alt={`${book.title} cover`}
                />
                <div>
                  <Heading size="md">{book.title}</Heading>
                  <Text>{book.subtitle}</Text>
                  <Text>{t('authors')}: {book.authors}</Text>
                  <Text>{t('categories')}: {book.categories}</Text>

                </div>
              </Box>
              <Text style={{ textAlign: 'center' }}> {t('book_is')} {book.available ?  t('available'): t('unvaillable')}</Text>

              <div id='favorite-rating'>
                {isAuthenticated && book.available && (
                  <div
                    style={{
                      display: 'inline-block',
                      textAlign: 'center',
                      direction: 'ltr',
                      fontFamily: 'sans-serif',
                      touchAction: 'none'
                    }}
                  >
                    <Rating
                      initialValue={book?.user_ratings?.find((userRating) => userRating?.user === user?.username)?.rating}
                      fillColorArray={[
                        '#f14f45',
                        '#f16c45',
                        '#f18845',
                        '#f1b345',
                        '#f1d045'
                      ]}
                      SVGstyle={{ 'display': 'inline' }}
                      onClick={async (value) => await giveStarRating(value, book._id)}
                    />
                  </div>
                )}
                {isAuthenticated && (
                  <>
                    {user?.favorites?.includes(book._id) ? (
                      <Button id='view' p={5} colorScheme="red" size="sm" onClick={async () => {
                        await setFavorites(book._id, false);
                      }}>{t('remove')}</Button>
                    ) : (
                      <Button id='view' p={5} colorScheme="teal" size="sm" onClick={async () => {
                        await setFavorites(book._id, true);
                      }}>{t('add_to_favorites')}</Button>
                    )}
                  </>
                )}
              </div>
            </Box>
          ))}
      </div>
      <Center id="pagination">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </Center>
    </>
  );
};
export default BookList;
