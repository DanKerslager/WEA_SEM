import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { Card, CardHeader, CardBody, CardFooter, Image, Heading, Text, Box, Button, Textarea, useColorModeValue, } from '@chakra-ui/react';
import { createComment } from '../api';

const Comments = ({ bookId, comments}) => {
    const [error, setError] = useState(null);
    //Get data from Cookies
    const profileCookie = Cookies.get('profile')
    const profile = profileCookie ? JSON.parse(profileCookie) : null;
    const username = profile?.user?.username;
    const isLoggedIn = profile?.isLoggedIn;

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        setError(null)
        console.log(data)
        try {
            let text = data.text;
            //Get username from cookies
            let user = username
            let comment = createComment({ bookId, text, user })
            console.log(comment)
        } catch (err) {
            setError(err.message)
        }
    }
    if (isLoggedIn) {
        return (
            <> 
                <Text fontSize='2xl'>Comments: {comments?.length || 0}</Text>
                <form onSubmit={handleSubmit(onSubmit)} id='comment-post'>
                    <Textarea id='text' placeholder='Write a comment'{...register('text', {
                        required: 'Write a comment',
                    })} />
                    <Button colorScheme="teal" variant="outline" type='submit' isLoading={isSubmitting}>Comment</Button>
                </form>
                <Box id='comments'>
                    {comments?.map((comment, index) =>(
                        <Box key={index} id='comment'>
                            <div>
                                <Text>{comment.user}</Text>
                                <Text>{comment.createdAt}</Text>
                            </div>
                            <p>{comment.text}</p>
                        </Box>
                    ))}
                </Box>
            </>
        )
    }
    else {
        return (
            <>
            <p>Sign up to see comments.</p>
            </>
        )
    }

};
export default Comments;