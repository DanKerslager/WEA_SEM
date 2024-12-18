import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Box,
  Button,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { toast, Bounce } from 'react-toastify';
import { removeFromCart, addQuantity, removeQuantity } from '../../utils'
import { useTranslation } from 'react-i18next';


const ShoppingCartPage = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, setShowShoppingCart } = useAuth();
  const [shoppingCart, setShoppingCart] = useState(() => {
    return JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
  });
  const fullPrice = shoppingCart.reduce((acc, book) => acc + book.price * book.quantity, 0).toFixed(2);
  const colorMode = useColorModeValue('gray.300', 'gray.700');

  useEffect(() => {

  }, [shoppingCart]);

  return (
    <>
      <Box className="shopping-cart" bg={colorMode}>
        <Box id="title-and-back-button">
          <h2>{t('cart_contents')}</h2>
          <Button
            colorScheme="red"
            variant="outline"
            as={Link}
            to="/"
          >
            X
          </Button>
        </Box>
        {shoppingCart.length === 0 ? (
          <p style={{textAlign: 'center'}}>{t('no_items_yet')}</p>
        ) : (
          <>
            {shoppingCart.map((book) => (
              <div className="cart-item">
                <img src={book.thumbnail} alt="book image" className="item-image" />
                <div className="item-details">
                  <h3>{book.title}</h3>
                  <p>{t('authors')}: {book.authors}</p>
                  <p>{t('categories')}: {book.categories}</p>
                </div>
                <div className="quantity-control">
                  <Button colorScheme="teal" className="quantity-btn" onClick={() => addQuantity(book._id, shoppingCart, setShoppingCart)}>+</Button>
                  <span>{book.quantity}</span>
                  <Button colorScheme="teal" className="quantity-btn" onClick={() => removeQuantity(book._id, shoppingCart, setShoppingCart)}>-</Button>
                </div>
                <div className="item-price">{book.price} CZK</div>
                <div className="item-price">{book.price*book.quantity !== book.price ?(<>{(book.price*book.quantity).toFixed(2)} CZK</>) : <>-</> }</div>
                <div className="item-actions">
                  <Button colorScheme="red" variant="outline" className="action-btn" onClick={() => removeFromCart(book._id, setShoppingCart)}>
                    {t('remove')}
                  </Button>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <h3>{t('sub_total')}</h3>
              <p>{shoppingCart.length} {t('items')}</p>
              <h3>{fullPrice} CZK</h3>
              <Button colorScheme="teal" className="checkout-btn" as={Link} to="/createOrder">{t('checkout')}</Button>
            </div>
          </>
        )}
      </Box>
    </>
  )
}

export default ShoppingCartPage