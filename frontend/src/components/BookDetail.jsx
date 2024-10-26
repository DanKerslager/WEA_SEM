// components/BookDetail.jsx
import { Card, CardHeader, CardBody, CardFooter, Image, Heading, Text, Box, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { usePageContext } from '../providers/PageProvider';

const BookDetail = () => {
  const { t } = useTranslation();
  const {MoveToBookDetail} = usePageContext();
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
            <Button
            ml={20}
            mt={4}
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