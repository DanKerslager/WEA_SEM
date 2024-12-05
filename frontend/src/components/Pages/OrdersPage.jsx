import React from 'react'
import { useState, useEffect } from 'react'
import { fetchOrders } from '../../api'
import { useAuth } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
const OrdersPage = ({ userId }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const { t } = useTranslation();
    const colorMode = useColorModeValue('gray.300', 'gray.700');
    const changeDateFormat = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
    const loadOrdersData = async () => {
        try {
            const orderData = await fetchOrders({ userId: userId });
            setOrders(orderData);
            console.log(orderData);
        } catch (error) {
            console.error('Error during fetching orders:', error);
        }
    }
    useEffect(() => {
        loadOrdersData();
    }, [user, userId]);
  return (
    <Box>
        <h1>Orders</h1>
        {orders.map((order) => (
            <Box key={order._id}>
                <h2>#{order._id}</h2>
                {order.shipped === true ? (
                    <p>DOKONČENÁ</p>
                ) : (
                    <p>VYŘIZOVANÁ</p>
                )}
                <p>Payment method : {order.payment}</p>
                <p>Total: {order.price}</p>
                <p>Total with "tax": {order.total}</p>
                <p>{changeDateFormat(order.orderDate)}</p>
                {order.items.map((item) => (
                    <Box key={item._id}>
                        <h3>{item.book.title}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.book.price} CZK</p>
                        {item.book.price*item.quantity !==  item.book.price ? (
                            <p>Total Price: {(item.book.price*item.quantity).toFixed(2)} CZK</p>
                        ): (
                            <p>-</p>
                        )}
                    </Box>
                ))}
            </Box>
        ))}
    </Box>
  )
}
export default OrdersPage