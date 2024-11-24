// components/BookDetail.jsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Box,
  Button,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { fetchBookDetail } from '../api';
import Comments from './Comments';
import { useAuth } from '../providers/AuthProvider';
import { addToCart, removeFromCart } from '../utils'

const BookDetail = ({ bookId, setBookDetail }) => {
  const [commentCreated, setCommentCreated] = useState(false);
  const [book, setBook] = useState({});
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const colorMode = useColorModeValue('gray.100', 'gray.700');
  const [shoppingCart, setShoppingCart] = useState(() => {
    return JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
  });
  //Get data from Cookies
  const { isAuthenticated, user } = useAuth();
  const isFavorited = user?.favoriteBooks?.find(favoriteId => favoriteId === bookId);
  const loadBookDetailData = async () => {
    setError(null);
    try {
      let data = await fetchBookDetail({ bookId });
      setBook(data);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    loadBookDetailData();
  }, [bookId, isAuthenticated, commentCreated]);
  return (
    <div id="center-card">
      <Box id="book-detail-card">
        <Box
          id="book-detail-content"
          bg={colorMode}
        >
          <Box id="title-and-back-button">
            
            {(book.available ||  isFavorited) ? (<Heading>{book.title}</Heading>) : (<Text>{t('bookDetailUnavailable')}</Text>)}
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => setBookDetail(false)}
            >
              X
            </Button>
          </Box>
          
          {(book.available || isFavorited) && (
            <>
              <br />
              <Box id="book-detail-content-essentials">
                <Image
                  id="book-detail-image"
                  objectFit="cover"
                  maxW={{ base: '100%', sm: '200px' }}
                  src={book.thumbnail}
                  alt={`${book.title} cover`}
                />
                <Box id="book-detail-content-text">
                  <Text>
                    {t('authors')}: {book.authors}
                  </Text>
                  <Text>
                    {t('categories')}: {book.categories}
                  </Text>
                  <Text>ISBN 10: {book.isbn10}</Text>
                  <Text>ISBN 13: {book.isbn13}</Text>
                  <Text>
                    {t('published_year')}: {book.published_year}
                  </Text>
                  <Text>
                    {t('average_rating')}: {book?.average_rating?.toFixed(2)}
                  </Text>
                  <Text>
                    {t('num_pages')}: {book.num_pages}
                  </Text>
                  <Text>
                    {t('ratings_count')}: {book.ratings_count}
                  </Text>
                  <Text>
                    {t('price')}: {book.price}
                  </Text>
                </Box>
                {shoppingCart.find((cartBook) => cartBook._id === book._id) ? (
                      <Button id='view' p={5} colorScheme="red" size="sm" onClick={async() => await removeFromCart(book._id, setShoppingCart)}>Remove from cart</Button>
                    ) : (
                      <Button id='view' p={5} colorScheme="teal" size="sm" onClick={async() => await addToCart(book, setShoppingCart)}>Add to cart</Button>
                    )}
              </Box>
              <br />
              <Text>{t('description')}:</Text>
              <Text>{book.description}</Text>
            </>
          )}
        </Box>
        {book.available && (
          <Box
            mt={5}
            id="comment-section"
            bg={colorMode}
          >
            <Comments
              bookId={bookId}
              comments={book.comments}
              commentCreated={commentCreated}
              setCommentCreated={setCommentCreated}
            />
          </Box>
        )}
      </Box>
    </div>
  );

};
export default BookDetail;
