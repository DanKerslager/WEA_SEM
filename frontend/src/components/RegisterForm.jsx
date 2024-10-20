import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Box,
    Heading,
    useColorModeValue
} from '@chakra-ui/react'
import { postRegister } from '../api';
const RegisterForm = ({ setShowRegister }) => {
    const { t } = useTranslation();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();
    const [error, setError] = useState();
    const onSubmit = async (data) => {
        let username = data.username;
        let email = data.email;
        let password = data.password;
        const postData = await postRegister({ username, email, password})
        console.log(postData)
        if (postData?.status === 201){
            console.log(postData)
            setShowRegister(false)
        }
        else{
            setError(postData.data.message)
        }
    }
    return (
        <Box id="popup-shadow" bg={useColorModeValue('gray.300', 'gray.800')} >
            <Box p={20} bg={useColorModeValue('gray.300', 'gray.800')} borderRadius={10}>
                <form onSubmit={handleSubmit(onSubmit)} id='sign-up' >
                    <FormControl isInvalid={errors.name} id="sign-up-content">
                        <Heading mb={5} as='h3' size='lg'>
                            {t('register')}
                        </Heading>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input
                            mb={5}
                            id='email'
                            placeholder='Email'
                            {...register('email', {
                                required: 'This is required',
                            })}
                        />
                        <FormLabel htmlFor='username'>{t('username')}</FormLabel>
                        <Input
                            mb={5}
                            id='username'
                            placeholder={t('username')}
                            {...register('username', {
                                required: 'This is required',
                                maxLength: { value: 10, message: 'Maximum length should be 10' },
                            })}
                        />
                        <FormLabel htmlFor='password'>{t('password')}</FormLabel>
                        <Input
                            mb={5}
                            id='password'
                            type='password'
                            placeholder={t('password')}
                            {...register('password', {
                                required: 'This is required',
                                minLength: { value: 6, message: 'Minimum length should be 6' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.name && errors.name.message && error}
                        </FormErrorMessage>
                    </FormControl>
                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        {t('register')}
                    </Button>
                    <Button ml={20} mt={4} colorScheme='gray' onClick={() => setShowRegister(false)}>
                    {t('cancel')}
                    </Button>
                </form>
            </Box>
        </Box>
    )

}

export default RegisterForm