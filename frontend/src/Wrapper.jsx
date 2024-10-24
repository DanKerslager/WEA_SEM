import React from 'react';
import {useState, useEffect} from 'react'
import { Grid, GridItem } from '@chakra-ui/react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import BookDetail from './components/BookDetail';

export const Wrapper = () => {

  const [detail, setDetail] = useState(() => {
    const savedDetail = localStorage.getItem('detail');
    return savedDetail === 'true'; // Convert string back to boolean
  });
  
  useEffect(() => {
    localStorage.setItem('detail', detail);
  }, [detail]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (detail) {
        setDetail(false); // Nastavení detail na false pouze pokud je true
      }
    };

    const handleKeyDown = (event) => {
      if (event.altKey && event.key === 'ArrowLeft' && detail) {
        setDetail(false); // Nastavení detail na false pouze pokud je true
      }
    };

    window.addEventListener('popstate', handlePopState); // Sledování změn stavu historie
    window.addEventListener('keydown', handleKeyDown); // Sledování stisknutí kláves

    return () => {
      window.removeEventListener('popstate', handlePopState); // Úklid
      window.removeEventListener('keydown', handleKeyDown); // Úklid
    };
  }, [detail]); // Přidání detail do závislostí useEffect

  return (
    <div id='wrapper'>
      <Header />
      {detail ? <BookDetail setDetail={setDetail}/> : <Main setDetail={setDetail}/>} {/* No props passed since all filtering and pagination is now handled inside Main */}
      <Footer />
    </div>
  );
};
