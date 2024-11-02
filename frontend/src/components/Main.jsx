import { useEffect, useState } from 'react';
import { useColorModeValue, Box, Button, Center } from '@chakra-ui/react';
import BookPage from './BookPage';
import BookDetail from './BookDetail'
import { usePageContext } from '../providers/AuthProvider';
// Main react component of the app.

const Main = () => {
  const [bookId, setBookId] = useState('');
  const [bookDetail, setBookDetail] = useState(() => {
    const savedDetail = localStorage.getItem('detail');
    return savedDetail === 'true'; // Convert string back to boolean
  });
  useEffect(() => {
    localStorage.setItem('detail', bookDetail);
  }, [bookDetail]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (bookDetail) {
        setBookDetail(false); // Nastavení detail na false pouze pokud je true
      }
    };
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === 'ArrowLeft' && bookDetail) {
        setBookDetail(false); // Nastavení detail na false pouze pokud je true
      }
    };
    window.addEventListener('popstate', handlePopState); // Sledování změn stavu historie
    window.addEventListener('keydown', handleKeyDown); // Sledování stisknutí kláves

    return () => {
      window.removeEventListener('popstate', handlePopState); // Úklid
      window.removeEventListener('keydown', handleKeyDown); // Úklid
    };
  }, [bookDetail]); // Přidání detail do závislostí useEffect
  return (
    <>
    <div id='main'>
      {bookDetail ? <BookDetail bookId={bookId} setBookDetail={setBookDetail}/> : <BookPage setBookId={setBookId} setBookDetail={setBookDetail}/>}
    </div>
    </>
  );
};

export default Main;
