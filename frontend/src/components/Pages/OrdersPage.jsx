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
                        <Box key={order._id}>
                            <AccordionButton id="order-item">
                                <h2>#{order._id}</h2>
                                <div>
                                    <p>{t('status')}:</p>
                                    <p>{order.status}</p>
                                </div>
                                <div>
                                    <p>{t('payment_method')}:</p>
                                    <p>{order.payment}</p>

                                </div>
                                <div>
                                    <p>{t('total')}:</p>
                                    <p>{order.price}</p>
                                </div>
                                <div>
                                    <p>{t('total_tax')}:</p>
                                    <p> {order.total}</p>
                                </div>
                                <div>
                                    <div>
                                        <p>{changeDateFormat(order.orderDate)}</p>
                                    </div>
                                </div>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>

                                {order.items.map((item) => (
                                    <Box key={item._id}>
                                        <h3>{item.book.title}</h3>
                                        <p>{t('quantity')}: {item.quantity}</p>
                                        <p>{t('price')}: {item.book.price} CZK</p>
                                        {item.book.price * item.quantity !== item.book.price ? (
                                            <p>{t('total_price')}: {(item.book.price * item.quantity).toFixed(2)} CZK</p>
                                        ) : (
                                            <p>-</p>
                                        )}
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