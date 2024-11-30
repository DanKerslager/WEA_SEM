import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { getLogin, updatePersonalInfo, updateAddressInfo } from '../../api';
import { useAuth } from '../../providers/AuthProvider';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Avatar,
  Text,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
const UserDetails = ({ userId }) => {

  const { t } = useTranslation();
  const { user, isAuthenticated, logout, setUser, setShowUserDetail } = useAuth();
  const colorMode = useColorModeValue('gray.100', 'gray.700');

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      personalAddress: {
        street:  "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      billingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      sameAsPersonalAddress: false,
      consentToDataProcessing: false,
      personalInfo: {
        firstName: "",
        lastName: "",
        gender: "",
        age: "",
        favoriteGenres: [],
        referenceSource: "",
      },
    },
  });

  const sameAsPersonalAddress = watch("sameAsPersonalAddress");

  useEffect(() => {
    if (user) {
      reset({
        personalAddress: {
          street: user.personalAddress?.street || "",
          city: user.personalAddress?.city || "",
          state: user.personalAddress?.state || "",
          zipCode: user.personalAddress?.zipCode || "",
          country: user.personalAddress?.country || "",
        },
        billingAddress: {
          street: user.billingAddress?.street || "",
          city: user.billingAddress?.city || "",
          state: user.billingAddress?.state || "",
          zipCode: user.billingAddress?.zipCode || "",
          country: user.billingAddress?.country || "",
        },
        sameAsPersonalAddress: user.sameAsPersonalAddress || false,
        consentToDataProcessing: user.consentToDataProcessing || false,
        personalInfo: {
          firstName: user.personalInfo?.firstName || "",
          lastName: user.personalInfo?.lastName || "",
          gender: user.personalInfo?.gender || "",
          age: user.personalInfo?.age || "",
          favoriteGenres: user.personalInfo?.favoriteGenres || [],
          referenceSource: user.personalInfo?.referenceSource || "",
        },
      });
    }
  }, [user, reset]);
  // Copy personalAddress to billingAddress if `sameAsPersonalAddress` is checked
  useEffect(() => {
    if (sameAsPersonalAddress) {
      const personalAddress = watch("personalAddress");
      setValue("billingAddress", personalAddress);
    }
  }, [userId, sameAsPersonalAddress, watch, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    const { personalAddress, billingAddress, sameAsPersonalAddress, personalInfo, consentToDataProcessing } = data;
    const changePersonalInfo = await updatePersonalInfo({ userId, ...personalInfo }); 
    console.log(changePersonalInfo)
    const changeAddress = await updateAddressInfo({ userId, personalAddress, billingAddress, sameAsPersonalAddress})
    console.log(changeAddress)
    setUser( { ...user, personalAddress, billingAddress, sameAsPersonalAddress, personalInfo, consentToDataProcessing });
    localStorage.setItem('user', JSON.stringify({ ...user, personalAddress, billingAddress, sameAsPersonalAddress, personalInfo, consentToDataProcessing }));
  };

  return (
    <Box id="user-detail-wrapper" bg={colorMode}>
      <Box id="user-detail-button-box">
        <Button id="user-detail-x-button"  ml={5} colorScheme="red" variant="outline" as={Link} to="/">
          X
        </Button>
      </Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box id="user-detail-form-content">
            <Box id="personal-address">
              <h2 class="user-detail-h2">{t('personalAddress')}</h2>
              <div>
                <label class="user-detail-label">{t('street')}</label>
                <input class="user-detail-input" {...register("personalAddress.street", { required: "Street is required" })} />
                {errors.personalAddress?.street && <p>{errors.personalAddress.street.message}</p>}
              </div>
              <div>
                <label class="user-detail-label">{t('city')}</label>
                <input class="user-detail-input" {...register("personalAddress.city", { required: "City is required" })} />
                {errors.personalAddress?.city && <p>{errors.personalAddress.city.message}</p>}
              </div>
              <div>
                <label class="user-detail-label">{t('state')}</label>
                <input class="user-detail-input" {...register("personalAddress.state", { required: "State is required" })} />
                {errors.personalAddress?.state && <p>{errors.personalAddress.state.message}</p>}
              </div>
              <div>
                <label class="user-detail-label">{t('zip_code')}</label>
                <input class="user-detail-input" {...register("personalAddress.zipCode", { required: "ZIP Code is required" })} />
                {errors.personalAddress?.zipCode && <p>{errors.personalAddress.zipCode.message}</p>}
              </div>
              <div>
                <label class="user-detail-label">{t('country')}</label>
                <input class="user-detail-input" {...register("personalAddress.country", { required: "Country is required" })} />
                {errors.personalAddress?.country && <p>{errors.personalAddress.country.message}</p>}
              </div>
            </Box>

            <Box id="billing-address">
              <h2 class="user-detail-h2">{t('billing_address')}</h2>
              <div>
                <label>
                  <input
                    class="user-detail-checkbox"
                    type="checkbox"
                    {...register("sameAsPersonalAddress")}
                  />
                  {t('same_as_personal')}
                </label>
              </div>
              {!sameAsPersonalAddress && (
                <>
                  <div>
                    <label class="user-detail-label">{t('street')}</label>
                    <input class="user-detail-input" {...register("billingAddress.street")} />
                  </div>
                  <div>
                    <label class="user-detail-label">{t('city')}</label>
                    <input class="user-detail-input" {...register("billingAddress.city")} />
                  </div>
                  <div>
                    <label class="user-detail-label">{t('state')}</label>
                    <input class="user-detail-input" {...register("billingAddress.state")} />
                  </div>
                  <div>
                    <label class="user-detail-label">{t('zip_code')}</label>
                    <input class="user-detail-input" {...register("billingAddress.zipCode")} />
                  </div>
                  <div>
                    <label class="user-detail-label">{t('country')}</label>
                    <input class="user-detail-input" {...register("billingAddress.country")} />
                  </div>
                </>
              )}
            </Box>
            <Box id="personal-information">
              <h2 class="user-detail-h2">{t('personal_information')}</h2>
              <div>
                <label class="user-detail-label">{t('first_name')}</label>
                <input class="user-detail-input" {...register("personalInfo.firstName", { required: "First Name is required" })} />
                {errors.personalInfo?.firstName && <p>{errors.personalInfo.firstName.message}</p>}
              </div>
              <div>
                <label class="user-detail-label">{t('last_name')}</label>
                <input class="user-detail-input" {...register("personalInfo.lastName", { required: "Last Name is required" })} />
                {errors.personalInfo?.lastName && <p>{errors.personalInfo.lastName.message}</p>}
              </div>
              <div>
                <label class="user-detail-label">{t('gender')}</label>
                <select class="user-detail-input" {...register("personalInfo.gender", { required: "Gender is required" })}>
                  <option value="">{t('select')}</option>
                  <option value="Male">{t('male')}</option>
                  <option value="Female">{t('female')}</option>
                  <option value="Other">{t('other')}</option>
                  <option value="Prefer not to say">{t('prefer_not_to_say')}</option>
                </select>
                {errors.personalInfo?.gender && <p>{errors.personalInfo.gender.message}</p>}
              </div>
              <div>
                <label class="user-detail-label">{t('age')}</label>
                <input class="user-detail-input" type="number" {...register("personalInfo.age", { valueAsNumber: true })} />
              </div>
              <div>
                <label class="user-detail-label">{t('favorite_genres')}</label>
                <Controller
                  name="personalInfo.favoriteGenres"
                  control={control}
                  render={({ field }) => (
                    <select class="user-detail-input" multiple {...field}>
                      <option value="Fiction">{t('fiction')}</option>
                      <option value="Non-Fiction">{t('non_fiction')}</option>
                      <option value="Mystery">{t('mystery')}</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                    </select>
                  )}
                />
              </div>
              <div>
                <label class="user-detail-label">{t('where_did_you_find')}</label>
                <input class="user-detail-input" {...register("personalInfo.referenceSource")} />
              </div>

              <h2>{t('consent')}</h2>
              <div>
                <label class="user-detail-label">
                  <input
                    class="user-detail-checkbox"
                    type="checkbox"
                    {...register("consentToDataProcessing", { required: "Consent is required" })}
                  />
                  {t('data_consent')}
                </label>
                {errors.consentToDataProcessing && <p>{errors.consentToDataProcessing.message}</p>}
              </div>
            </Box>
          </Box>
          <Button id="user-detail-submit-button" colorScheme="teal" type="submit">{t('save_changes')}</Button>
        </form>
      </Box>
    </Box>
  );
};

export default UserDetails;