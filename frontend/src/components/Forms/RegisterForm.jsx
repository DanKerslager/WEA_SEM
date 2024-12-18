import React, { useState } from 'react';
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
import { toast, Bounce } from 'react-toastify';
import { postRegister, updatePersonalInfo, updateAddressInfo } from '../../api';

const RegisterForm = ({ setShowRegister }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    let username = data.username;
    let email = data.email;
    let password = data.password;
    const postData = await postRegister({ username, email, password });
    //init values
    const firstName = '';
    const lastName = '';
    const gender = 'Male';
    const age = 0;
    const favoriteGenres = '';
    const referenceSource = '';
    const personalAddress = { street: ' ', city: ' ', state: ' ', zipCode: ' ', country: ' ' };
    const billingAddress = { street: ' ', city: ' ', state: ' ', zipCode: ' ', country: ' ' };
    const sameAsPersonalAddress = false;
    const personalInfo = await updatePersonalInfo({ userId: postData.data.userId, firstName, lastName, gender, age, favoriteGenres, referenceSource })
    console.log(personalInfo)
    const addressInfo = await updateAddressInfo({ userId: postData.data.userId, personalAddress, billingAddress, sameAsPersonalAddress })
    console.log(addressInfo)
    if (postData?.status === 201) {
      setError(null);
      toast.success(postData.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setShowRegister(false);
      setSuccess(null);
    } else {
      setError(postData.message);
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
            <FormControl isInvalid={errors.email} >
              <Heading mb={5} as="h3" size="lg">
                {t('register')}
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
            <FormControl isInvalid={errors.username}>
              <FormLabel htmlFor="username">{t('username')}</FormLabel>
              <Input
                mb={5}
                id="username"
                placeholder={t('username')}
                {...register('username', {
                  required: 'This is required',
                  maxLength: {
                    value: 10,
                    message: 'Maximum length should be 10',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
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
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            {error && (<p style={{ color: '#FC8181' }}>{error}</p>)}
            {success && (<p style={{ color: '#0AAC36' }}>{success}. Please, sign in to your account</p>)}
            <Button
              ml={20}
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              {t('register')}
            </Button>
            <Button
              ml={20}
              mt={4}
              colorScheme="teal"
              variant="outline"
              onClick={() => setShowRegister(false)}
            >
              {t('cancel')}
            </Button>
          </div>
        </form>
      </Box>
    </Box >
  );
};
export default RegisterForm;
