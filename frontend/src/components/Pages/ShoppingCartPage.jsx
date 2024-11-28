import React from 'react'
import {
  Button,
 
} from '@chakra-ui/react';
import { useAuth } from '../../providers/AuthProvider';
const ShoppingCartPage = () => {
  const { user, isAuthenticated, setShowShoppingCart } = useAuth();
  return (
    <>
     <Button
              colorScheme="red"
              variant="outline"
              onClick={() => setShowShoppingCart(false)}
            >
              X
            </Button>
            <div>ShoppingCart</div>
    </>
  )
}

export default ShoppingCartPage