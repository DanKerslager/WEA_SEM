import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { getLogin } from '../api';

const LoginForm = ({ setShowLogin, setIsLoggedIn }) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState();
  const onSubmit = async (data) => {
    let email = data.email;
    let password = data.password;
    const loginData = await getLogin({ email, password });
    console.log(loginData);
    if (loginData?.status === 200) {
      Cookies.set('username', loginData.data.user.username);
      Cookies.set('email', loginData.data.user.email);
      //Tohle bude potřeba ještě vyřešit
      Cookies.set('password', data.password);

      setShowLogin(false);
      setIsLoggedIn(true);
      window.location.reload();
    } else {
      setError(loginData.data.message);
    }
  };
  return (
    <Box id="popup-shadow" bg={useColorModeValue('gray.300', 'gray.800')}>
      <Box
        p={20}
        bg={useColorModeValue('gray.300', 'gray.800')}
        borderRadius={10}
      >
        <form onSubmit={handleSubmit(onSubmit)} id="sign-up">
          <FormControl isInvalid={errors.name} id="sign-up-content">
            <Heading mb={5} as="h3" size="lg">
              {t('login')}
            </Heading>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              mb={5}
              id="email"
              placeholder="Email"
              {...register('email', {
                required: 'This is required',
              })}
            />
            <FormLabel htmlFor="password">{t('password')}</FormLabel>
            <Input
              mb={5}
              id="password"
              type="password"
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
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            {t('login')}
          </Button>
          <Button
            ml={20}
            mt={4}
            colorScheme="teal"
            variant="outline"
            onClick={() => setShowLogin(false)}
          >
            {t('cancel')}
          </Button>
        </form>
      </Box>
    </Box>
  );
};
export default LoginForm;
