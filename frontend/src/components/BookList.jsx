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
import { useState } from 'react';
// React module, which shows the list of books on the main page of the app.
const BookList = ({ setBookId, setBookDetail, books, loading, error, totalPages, page, setPage }) => {
  const { t } = useTranslation();

  //test
  const [rating, setRating] = useState(0)




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
            <>
              <Box
                onClick={() => {
                  setBookDetail(true);
                  setBookId(book._id);
                  localStorage.setItem('bookId', book._id);
                }}
                id="book-card"
                //borderWidth="1px"
                borderRadius="lg"
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
              <Text style={{textAlign: 'center'}}>Book is {book.available ? 'Availlable' : 'Unvaillable'}</Text>
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
                fillColorArray={[
                  '#f14f45',
                  '#f16c45',
                  '#f18845',
                  '#f1b345',
                  '#f1d045'
                ]}
                  SVGstyle={{'display': 'inline'}}
                  onClick={(rate) => console.log(rate)}
                  
                />
              </div>
              <Button id='view' colorScheme="red" size="sm">Add to favourite</Button>
            </>
          ))}
      </div>
      <Center id="pagination">
        {console.log(page)}
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
