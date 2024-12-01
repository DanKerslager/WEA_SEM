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

const ShoppingCartPage = () => {
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
          <h2>Obsah košíku</h2>
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
          <p style={{textAlign: 'center'}}>No item has been added yet</p>
        ) : (
          <>
            {shoppingCart.map((book) => (
              <div className="cart-item">
                <img src={book.thumbnail} alt="book image" className="item-image" />
                <div className="item-details">
                  <h3>{book.title}</h3>
                  <p>Authors: {book.authors}</p>
                  <p>Categories: {book.categories}</p>
                </div>
                <div className="quantity-control">
                  <Button colorScheme="teal" className="quantity-btn" onClick={() => addQuantity(book._id, shoppingCart, setShoppingCart)}>+</Button>
                  <span>{book.quantity}</span>
                  <Button colorScheme="teal" className="quantity-btn" onClick={() => removeQuantity(book._id, shoppingCart, setShoppingCart)}>-</Button>
                </div>
                <div className="item-price">{book.price} CZK</div>
                <div className="item-actions">
                  <Button colorScheme="red" variant="outline" className="action-btn" onClick={() => removeFromCart(book._id, setShoppingCart)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <h3>Sub-Total</h3>
              <p>{shoppingCart.length} items</p>
              <h3>{fullPrice} CZK</h3>
              <Button colorScheme="teal" className="checkout-btn" as={Link} to="/createOrder">Checkout</Button>
            </div>
          </>
        )}
      </Box>
    </>
  )
}

export default ShoppingCartPage