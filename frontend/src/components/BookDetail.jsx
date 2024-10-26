// components/BookDetail.jsx
import { Card, CardHeader, CardBody, CardFooter, Image, Heading, Text, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const BookDetail = () => {
    return (
        <Box id="book-detail-card">
            <Image id="book-detail-image" />
            <Box id="book-detail-text">
                <Heading>Title</Heading>
                <Box id="book-detail-text-essentials">
                    <Text>Author</Text>
                    <Text>Categories</Text>
                    <Text>ISBN 10</Text>
                    <Text>ISBN 13</Text>
                </Box>
                <Text>Desription</Text>
            </Box>
            <Box id="comment-section">
                <Text>Magical dynamic comment section to be done later</Text>
            </Box>
        </Box>
    )
};

export default BookDetail;