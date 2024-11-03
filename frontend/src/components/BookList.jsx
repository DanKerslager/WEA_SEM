// components/BookList.js
import { Card, Image, Heading, Text, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { usePageContext } from '../providers/AuthProvider';
// React module, which shows the list of books on the main page of the app.
const BookList = ({ setBookId, setBookDetail, books, loading, error }) => {
  const { t } = useTranslation();

  return (
    <div id="book-list">
      {!loading && !error && books.map(book => (
          <Box onClick={() => {setBookDetail(true); setBookId(book._id); localStorage.setItem('bookId',book._id);}} id="book-card"  borderWidth='1px' borderRadius='lg' overflow='hidden'
            key={book._id}>
            <Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={book.thumbnail} alt={`${book.title} cover`} />
            <Heading size='md'>{book.title}</Heading>
            <Text>{book.subtitle}</Text>
            <Text>{t('authors')}: {book.authors}</Text>
            <Text>{t('categories')}: {book.categories}</Text>
          </Box>
      ))
      }
    </div >
  );
};

export default BookList;
