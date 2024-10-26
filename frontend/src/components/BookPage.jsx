import React from 'react'
import { useEffect, useState } from 'react';
import {  useColorModeValue, Box, Button, Center} from '@chakra-ui/react';
import Filter from './Filter';
import BookList from './BookList';
import { fetchBooks } from '../api';
import { onTitleOnChange, onAuthorsOnChange, onCategoriesOnChange, onIsbnOnChange } from '../filter';

const BookPage = () => {
    const lastPage = localStorage.getItem('lastPage');
    // Filtering variables for the book fetch.
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(() => { return lastPage || 1; });
    const [totalPages, setTotalPages] = useState(1);
    const [isbn, setIsbn] = useState('');
    const [authors, setAuthors] = useState('');
    const [categories, setCategories] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const limit = 10;

    // Function to fetch books data from the backend.
    const loadBooksData = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchBooks({ isbn, authors, categories, title, page, limit });
            localStorage.setItem('lastPage', page);
            setBooks(data.bookArray);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBooksData();
    }, [isbn, authors, categories, title, page]);
    return (
        <>
            <Box bg={useColorModeValue('green.300', 'green.800')} id="filters">
                <Filter
                    onIsbnChange={onIsbnOnChange(e => { setIsbn(e?.target?.value); setPage(1); })}
                    onTitleChange={onTitleOnChange(e => { setTitle(e?.target?.value); setPage(1); })}
                    onAuthorChange={onAuthorsOnChange((e) => { setAuthors(e?.target?.value); setPage(1); })}
                    onCategoriesChange={onCategoriesOnChange((e) => { setCategories(e?.target?.value); setPage(1); })}
                />
            </Box>
            <div id="books">
                <BookList books={books} loading={loading} error={error} />
                <Center id="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index}
                            colorScheme='teal'
                            m={2}
                            onClick={() => setPage(index + 1)}
                            disabled={page === index + 1}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </Center>
            </div>
        </>
    )
}

export default BookPage