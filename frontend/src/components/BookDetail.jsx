// components/BookDetail.jsx
import { Card, CardHeader, CardBody, CardFooter, Image, Heading, Text, Box, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { usePageContext } from '../providers/PageProvider';
import { fetchBookDetail } from '../api';
import { useEffect, useState } from 'react';


const BookDetail = () => {
  const [id, setId] = useState('');
  const [book, setBook] = useState({});
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const {bookId, bookDetail, MoveToBookDetail} = usePageContext();
  const loadBookDetailData = async () => {
    setError(null);
    try {
        const data = await fetchBookDetail({bookId});
        setBook(data)

    } catch (err) {
        setError(err.message);
    }
};

useEffect(() => {
    loadBookDetailData();
}, [bookId]);
    return (
        <Box id="book-detail-card">
            <Image id="book-detail-image" />
            <Box id="book-detail-text">
                <Heading>Title: {book.title}</Heading>
                <Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={book.thumbnail} alt={`${book.title} cover`} />
                <Box id="book-detail-text-essentials">
                    <Text>Author: {book.authors}</Text>
                    <Text>Categories: {book.categories}</Text>
                    <Text>ISBN 10: {book.isbn10}</Text>
                    <Text>ISBN 13: {book.isbn13}</Text>
                    <Text>Published year: {book.published_year}</Text>
                    <Text>Average rating: {book.average_rating}</Text>
                    <Text>Number of Pages: {book.num_pages}</Text>
                    <Text>Ratings Count: {book.ratings_count}</Text>
                </Box>
                <Text>Description:</Text>
                <Text>{book.description}</Text>
            </Box>
            <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => MoveToBookDetail(false)}>
            {t('cancel')}
            </Button>
            <Box id="comment-section">
                <Text>Magical dynamic comment section to be done later</Text>
            </Box>
        </Box>
    )
};

export default BookDetail;