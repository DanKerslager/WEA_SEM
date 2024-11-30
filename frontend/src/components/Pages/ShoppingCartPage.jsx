import React from 'react'
import {
  Button,
 
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
const ShoppingCartPage = () => {
  const { user, isAuthenticated, setShowShoppingCart } = useAuth();
  return (
    <>
     <Button
              colorScheme="red"
              variant="outline"
              as={Link}
              to="/"
              
            >
              X
            </Button>
            <div>ShoppingCart</div>
    </>
  )
}

export default ShoppingCartPage