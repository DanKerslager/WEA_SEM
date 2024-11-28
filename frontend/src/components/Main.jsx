import { useEffect, useState } from 'react';
import { useColorModeValue, Box, Button, Center } from '@chakra-ui/react';
import BookPage from './Pages/BookPage';
import BookDetail from './Details/BookDetail';
import { usePageContext } from '../providers/AuthProvider';
import UserDetails from './Details/UserDetails';
import { useAuth } from '../providers/AuthProvider';
import ShoppingCart from './Pages/ShoppingCartPage';

// Main react component of the app.

const Main = () => {
  const [bookId, setBookId] = useState('');
  const [bookDetail, setBookDetail] = useState(() => {
    const savedDetail = localStorage.getItem('detail');
    return savedDetail === 'true'; // Convert string back to boolean
  });
  const { user, setUser, isAuthenticated, showUserDetail, showShoppingCart } = useAuth();
  useEffect(() => {
    localStorage.setItem('detail', bookDetail);
    if (bookId === '') {
      setBookId(localStorage.getItem('bookId'));
    }
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
    <div id='main'>
      {showUserDetail ? (
        <UserDetails userId={user?._id} />
      )
        : showShoppingCart ? (
          <ShoppingCart />
        )
          : (
            <>
              {bookDetail ?
                <BookDetail bookId={bookId} setBookDetail={setBookDetail} /> :
                <BookPage setBookId={setBookId} setBookDetail={setBookDetail} />
              }
            </>
          )}

    </div>
  );
};

export default Main;
