// components/BookList.js
import { Card, CardHeader, CardBody, CardFooter, Image, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
// React module, which shows the list of books on the main page of the app.
const BookList = ({ books, loading, error }) => {
  const { t } = useTranslation();
  if (loading) return <p>{t('loading')}...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div id="book-list">
      {!loading && !error && books.map(book => (
        <a href='https://www.google.com/'>
          <Card id="book-card" borderWidth='1px' p='10px' borderRadius='lg' direction={{ base: 'column', sm: 'row' }}
            overflow='hidden' variant='outline' key={book._id}>
            <Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={book.thumbnail} alt={`${book.title} cover`} />
            <Heading size='md'>{book.title}</Heading>
            <Text>{book.subtitle}</Text>
            <Text>{t('authors')}: {book.authors}</Text>
            <Text>{t('categories')}: {book.categories}</Text>

          </Card>
        </a>
      ))
      }
    </div >
  );
};

export default BookList;
