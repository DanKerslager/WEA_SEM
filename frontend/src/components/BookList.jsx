// components/BookList.js
import { Card, CardHeader, CardBody, CardFooter, Image, Heading, Text } from '@chakra-ui/react'
// React module, which shows the list of books on the main page of the app.
const BookList = ({ books, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {!loading && !error && books.map(book => (
        <Card borderWidth='1px' maxW='960px' minH='200px' p='10px' borderRadius='lg' direction={{ base: 'column', sm: 'row' }}
          overflow='hidden' variant='outline' key={book._id}>
          <Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={book.thumbnail} alt={`${book.title} cover`} />
    
          <div>
            <header>
              <Heading size='md'>{book.title}</Heading>
              <Text>{book.subtitle}</Text>
            </header>
            <div >
              <Text>Authors: {book.authors}</Text>
              <Text>Categories: {book.categories}</Text>
              <Text>Published year: {book.published_year}</Text>
            </div>
          </div>
          <div >
            <Text>Pages: {book.num_pages}</Text>
            <Text>BookStock rate: {book.average_rating}</Text>
            <Text>Ratings: {book.ratings_count}</Text>
          </div>
        </Card>
      ))
      }
    </div >
  );
};

export default BookList;
