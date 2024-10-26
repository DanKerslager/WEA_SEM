import { useEffect, useState } from 'react';
import { useColorModeValue, Box, Button, Center } from '@chakra-ui/react';
import BookPage from './BookPage';
import BookDetail from './BookDetail'
import { usePageContext } from '../providers/PageProvider';
// Main react component of the app.

const Main = () => {
  const {bookDetail, MoveToBookDetail} = usePageContext();

  useEffect(() => {
    localStorage.setItem('detail', bookDetail);
  }, [bookDetail]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (bookDetail) {
        MoveToBookDetail(false); // Nastavení detail na false pouze pokud je true
      }
    };
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === 'ArrowLeft' && bookDetail) {
        MoveToBookDetail(false); // Nastavení detail na false pouze pokud je true
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
      {bookDetail ? <BookDetail /> : <BookPage />}
    </>
  );
};

export default Main;
