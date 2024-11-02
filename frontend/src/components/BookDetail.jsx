// components/BookDetail.jsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { usePageContext } from '../providers/AuthProvider';
import { fetchBookDetail } from '../api';
import { Card, CardHeader, CardBody, CardFooter, Image, Heading, Text, Box, Button, Textarea, useColorModeValue, } from '@chakra-ui/react';
import Comments from './Comments';

const BookDetail = ({ bookId, setBookDetail }) => {
    const [book, setBook] = useState({});
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    

    const loadBookDetailData = async () => {
        setError(null);
        try {
            const data = await fetchBookDetail({ bookId });
            console.log(data)
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
            <Box id="book-detail-content" bg={useColorModeValue('gray.400', 'gray.700')}>
                <Box id="title-and-back-button">
                    <Heading>{book.title}</Heading>
                    <Button
                        colorScheme="red"
                        variant="outline"
                        onClick={() => setBookDetail(false)}>
                        X
                    </Button>
                </Box>
                <br></br>
                <Box id="book-detail-content-essentials">
                    <Image id="book-detail-image" objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src={book.thumbnail} alt={`${book.title} cover`} />
                    <Box id="book-detail-content-text">
                        <Text>{t('authors')}: {book.authors}</Text>
                        <Text>{t('categories')}: {book.categories}</Text>
                        <Text>ISBN 10: {book.isbn10}</Text>
                        <Text>ISBN 13: {book.isbn13}</Text>
                        <Text>{t('published_year')}: {book.published_year}</Text>
                        <Text>{t('average_rating')}: {book.average_rating}</Text>
                        <Text>{t('num_pages')}: {book.num_pages}</Text>
                        <Text>{t('ratings_count')}: {book.ratings_count}</Text>
                    </Box>
                </Box>
                <br></br>
                <Text>{t('description')}:</Text>
                <Text>{book.description}</Text>
            </Box>
            
            <Box mt={5} id="comment-section" bg={useColorModeValue('gray.400', 'gray.700')}>
                <Comments bookId={bookId} comments={book.comments}/>
            </Box>
        </Box>
    )
};
export default BookDetail;