import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { getLogin, updatePersonalInfo, updateAddressInfo, submitOrder } from '../../api';
import { useAuth } from '../../providers/AuthProvider';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import {
  Box,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
const UserDetails = ({ userId }) => {
  console.log(userId);
  const { t } = useTranslation();
  const { user, isAuthenticated, logout, setUser, setShowUserDetail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOrdering, setIsOrdering] = useState(() => {
    return location.pathname === "/createOrder";
  });
  const [shoppingCart, setShoppingCart] = useState(() => {
    if (isOrdering) {
      return JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
    }
  });
  const fullPrice = isOrdering ?? shoppingCart.reduce((acc, book) => acc + book.price * book.quantity, 0).toFixed(2);
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
        street: "",
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
  const paymentMethod = watch("paymentMethod");

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
    setIsOrdering(location.pathname === "/createOrder");
  }, [userId, sameAsPersonalAddress, watch, setValue, location.pathname]);

  const onSubmit = async (data) => {
    const { personalAddress, billingAddress, sameAsPersonalAddress, personalInfo, consentToDataProcessing } = data;
    if (isOrdering) {
      const user = {
        userID: userId,
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        email: data.email,
        billingAddress,
        shippingAddress: billingAddress,
        personalAddress,
        personalInfo,
        consentToDataProcessing,
      }
      const order = await submitOrder({ user, books: shoppingCart, paymentMethod });
      console.log(order);
      if (order.status === 201) {
        toast.success("Order created successfully", {
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
        sessionStorage.removeItem('shoppingCart');
        navigate('/');
        return;
      }
      toast.error("Server Error", {
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
      return;
    }
    console.log(data);
    const changePersonalInfo = await updatePersonalInfo({ userId, ...personalInfo });
    console.log(changePersonalInfo)
    const changeAddress = await updateAddressInfo({ userId, personalAddress, billingAddress, sameAsPersonalAddress })
    console.log(changeAddress)
    setUser({ ...user, personalAddress, billingAddress, sameAsPersonalAddress, personalInfo, consentToDataProcessing });
    localStorage.setItem('user', JSON.stringify({ ...user, personalAddress, billingAddress, sameAsPersonalAddress, personalInfo, consentToDataProcessing }));
    toast.success("User data updated successfully", {
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


  };
  return (
    <Box id="user-detail-wrapper" bg={colorMode}>
      <Box id="user-detail-button-box">
        <Button id="user-detail-x-button" ml={5} colorScheme="red" variant="outline" as={Link} to="/">
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
                <input class="user-detail-input" {...register("personalAddress.street", { required: t('street_required') })} />
                {errors.personalAddress?.street && <p style={{ color: '#FC8181' }}>{errors.personalAddress.street.message}</p>}
              </div>
              <div>
                <label class="user-detail-label">{t('city')}</label>
                <input class="user-detail-input" {...register("personalAddress.city", { required: t('city_required') })} />
                {errors.personalAddress?.city && <p style={{ color: '#FC8181' }}>{errors.personalAddress.city.message}</p>}
              </div>
              <div>
                <label class="user-detail-label">{t('state')}</label>
                <input class="user-detail-input" {...register("personalAddress.state", { required: t('state_required') })} />
                {errors.personalAddress?.state && <p style={{ color: '#FC8181' }}>{errors.personalAddress.state.message}</p>}
              </div>
              <div>
                <label class="user-detail-label">{t('zip_code')}</label>
                <input class="user-detail-input" {...register("personalAddress.zipCode", { required: t('ZIP_required') })} />
                {errors.personalAddress?.zipCode && <p style={{ color: '#FC8181' }}>{errors.personalAddress.zipCode.message}</p>}
              </div>
              <div>
                <label class="user-detail-label">{t('country')}</label>
                <input class="user-detail-input" {...register("personalAddress.country", { required: t('country_required') })} />
                {errors.personalAddress?.country && <p style={{ color: '#FC8181' }}>{errors.personalAddress.country.message}</p>}
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
                <input class="user-detail-input" {...register("personalInfo.firstName", { required: t('first_name_required') })} />
                {errors.personalInfo?.firstName && <p style={{ color: '#FC8181' }}>{errors.personalInfo.firstName.message}</p>}
              </div>
              <div>
                <label class="user-detail-label">{t('last_name')}</label>
                <input class="user-detail-input" {...register("personalInfo.lastName", { required: t('last_name_required') })} />
                {errors.personalInfo?.lastName && <p style={{ color: '#FC8181' }}>{errors.personalInfo.lastName.message}</p>}
              </div>
              <div>
                <label class="user-detail-label">{t('gender')}</label>
                <select class="user-detail-input" {...register("personalInfo.gender", { required: t('gender_required') })}>
                  <option value="">{t('select')}</option>
                  <option value="Male">{t('male')}</option>
                  <option value="Female">{t('female')}</option>
                  <option value="Other">{t('other')}</option>
                  <option value="Prefer not to say">{t('prefer_not_to_say')}</option>
                </select>
                {errors.personalInfo?.gender && <p style={{ color: '#FC8181' }}>{errors.personalInfo.gender.message}</p>}
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
            </Box>
            {isOrdering && (
              <Box id="order-accept">
                <h2 class="user-detail-h2">{t('your_order')}</h2>
                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email">{t('email_address')}</label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={user?.email}
                    {...register("email", { required: t('email_required') })}
                  />
                  {errors.email && <p style={{ color: '#FC8181' }}>{errors.email.message}</p>}
                </div>

                {/* Payment Method */}
                <div className="form-group">
                  <label>{t('payment_method')}</label>
                  <div className="payment-options">
                    <label className={`option ${paymentMethod === "Dobírka" ? "active" : ""}`}>
                      <input
                        type="radio"
                        value="Dobírka"
                        {...register("paymentMethod", { required: t('payment_method_required')})}
                      />
                      {t('cash_on_delivery')}
                    </label>
                    <ul>
                      <li className="payment-options-text">{t('cash_on_delivery_extra')}50 Kč.</li>
                    </ul>
                    <label className={`option ${paymentMethod === "Bankovní převod" ? "active" : ""}`}>
                      <input
                        type="radio"
                        value="Bankovní převod"
                        {...register("paymentMethod", { required: t('payment_method_required') })}
                      />
                      {t('bank_transfer')}
                    </label>
                    <ul>
                      <li className="payment-options-text">{t('bank_transfer_extra')}</li>
                    </ul>
                    <label className={`option ${paymentMethod === "Kartou online" ? "active" : ""}`}>
                      <input
                        type="radio"
                        value="Kartou online"
                        {...register("paymentMethod", { required: t('payment_method_required') })}
                      />
                      {t('card')}
                    </label>
                    <ul>
                      <li className="payment-options-text">{t('card_extra')}</li>
                    </ul>

                  </div>
                </div>
                {errors.paymentMethod && (<p style={{ color: '#FC8181' }}>{errors.paymentMethod.message}</p>)}
              </Box>
            )}
          </Box>
          <Box id="user-consent">
            <h2 style={{ textAlign: "start" }} id="consent-label">{t('consent')}</h2>
            <div>
              <label class="user-detail-label">
                <input
                  class="user-detail-checkbox"
                  type="checkbox"
                  {...register("consentToDataProcessing", { required: t('consent_required') })}
                />
                {t('data_consent')}
              </label>
              {errors.consentToDataProcessing && <p style={{ color: '#FC8181' }}>{errors.consentToDataProcessing.message}</p>}
            </div>
          </Box>
          {isOrdering ? (
            <Button id="user-detail-submit-button" colorScheme="teal" type="submit">{t('place_order')}</Button>
          ) : (
            <Button id="user-detail-submit-button" colorScheme="teal" type="submit">{t('save_changes')}</Button>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default UserDetails;