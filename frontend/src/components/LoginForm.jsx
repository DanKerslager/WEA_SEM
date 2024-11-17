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
import { getLogin, updatePersonalInfo, updateAddressInfo } from '../api';
import { useAuth } from '../providers/AuthProvider';

const LoginForm = ({ setShowLogin }) => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    let email = data.email;
    let password = data.password;
    const loginData = await getLogin({ email, password });
    //test values
    const firstName = 'test';
    const lastName = 'test';
    const gender = 'Male';
    const age = 25;
    const favoriteGenres = 'test';
    const referenceSource = 'test';

    const testPersonal = updatePersonalInfo({ userId: loginData.data.user.userId, firstName, lastName, gender, age, favoriteGenres, referenceSource})
    console.log(testPersonal)
    const personalAddress = { street: 'droga', city: 'Mesto', zipCode: 'test', country: 'bigCountry' };
    const billingAddress =  { street: 'droga', city: 'newMesto', zipCode: 'asdasd', country: 'NewCountry' };
    const sameAsPersonalAddress = true;
    const testAddress = updateAddressInfo({ userId: loginData.data.user.userId, personalAddress, billingAddress, sameAsPersonalAddress})
    console.log(testAddress)
    //get user data
    let user = loginData.data.user;
    if (loginData?.status === 200) {
      login(user);
      setShowLogin(false);
    } else {
      setError(loginData.message);
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
          <div id="sign-up-content">
            <FormControl mb={5} isInvalid={errors.email}>
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
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mb={5} isInvalid={errors.password}>
              <FormLabel htmlFor="password">{t('password')}</FormLabel>
              <Input
                mb={5}
                id="password"
                type="password"
                placeholder={t('password')}
                {...register('password', {
                  required: 'This is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum length should be 6',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            {error && <p style={{ color: '#FC8181' }}>{error}</p>}
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
          </div>
        </form>
      </Box>
    </Box>
  );
};
export default LoginForm;
