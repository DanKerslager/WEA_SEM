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
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';
const OrdersPage = ({ userId }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const { t } = useTranslation();
    const colorMode = useColorModeValue('gray.300', 'gray.700');
    const colorModeHover = useColorModeValue('green.300', 'green.800');
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
            <h1>{t('orders')}</h1>
            <Accordion defaultIndex={[0]} allowMultiple>
                {orders.map((order) => (
                    <AccordionItem >
                        <Box id="accordion-order-item" key={order._id} _hover={{ bg: colorModeHover }}>
                            <AccordionButton id="order-item">
                                <Box id="order-list-parameters">
                                    <h2>#{order._id}</h2>
                                    <p>{order.status}</p>
                                    <p>{order.payment}</p>
                                    <p>{order.total} CZK</p>
                                    <p>{changeDateFormat(order.orderDate)}</p>
                                    <AccordionIcon />
                                </Box>
                            </AccordionButton>
                            <AccordionPanel>
                                <Box id="order-list-captions">
                                    <p class="order-list-book-data">{t('title')}</p>
                                    <p class="order-list-book-data">{t('quantity')}</p>
                                    <p class="order-list-book-data">{t('price')}</p>
                                    <p class="order-list-book-data">{t('total_price')}</p>
                                </Box>
                                {order.items.map((item) => (
                                    <Box key={item._id} id="order-list-book">
                                        <h3 class="order-list-book-data">{item.book.title}</h3>
                                        <p class="order-list-book-data">{item.quantity}</p>
                                        <p class="order-list-book-data">{item.book.price} CZK</p>
                                        <p class="order-list-book-data">{(item.book.price * item.quantity).toFixed(2)} CZK</p>
                                        <hr></hr>
                                    </Box>
                                ))}
                            </AccordionPanel>
                        </Box>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    )
}
export default OrdersPage