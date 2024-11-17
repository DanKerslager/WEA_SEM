import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { getLogin, updatePersonalInfo, updateAddressInfo } from '../api';
const UserDetails = ({ userId }) => {

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

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Personal Address</h2>
      <div>
        <label>Street</label>
        <input {...register("personalAddress.street", { required: "Street is required" })} />
        {errors.personalAddress?.street && <p>{errors.personalAddress.street.message}</p>}
      </div>
      <div>
        <label>City</label>
        <input  {...register("personalAddress.city", { required: "City is required" })} />
        {errors.personalAddress?.city && <p>{errors.personalAddress.city.message}</p>}
      </div>
      <div>
        <label>State</label>
        <input {...register("personalAddress.state", { required: "State is required" })} />
        {errors.personalAddress?.state && <p>{errors.personalAddress.state.message}</p>}
      </div>
      <div>
        <label>ZIP Code</label>
        <input {...register("personalAddress.zipCode", { required: "ZIP Code is required" })} />
        {errors.personalAddress?.zipCode && <p>{errors.personalAddress.zipCode.message}</p>}
      </div>
      <div>
        <label>Country</label>
        <input {...register("personalAddress.country", { required: "Country is required" })} />
        {errors.personalAddress?.country && <p>{errors.personalAddress.country.message}</p>}
      </div>

      <h2>Billing Address</h2>
      <div>
        <label>
          <input
            type="checkbox"
            {...register("sameAsPersonalAddress")}
          />
          Same as personal address
        </label>
      </div>
      {!sameAsPersonalAddress && (
        <>
          <div>
            <label>Street</label>
            <input {...register("billingAddress.street")} />
          </div>
          <div>
            <label>City</label>
            <input {...register("billingAddress.city")} />
          </div>
          <div>
            <label>State</label>
            <input {...register("billingAddress.state")} />
          </div>
          <div>
            <label>ZIP Code</label>
            <input {...register("billingAddress.zipCode")} />
          </div>
          <div>
            <label>Country</label>
            <input {...register("billingAddress.country")} />
          </div>
        </>
      )}

      <h2>Personal Information</h2>
      <div>
        <label>First Name</label>
        <input {...register("personalInfo.firstName", { required: "First Name is required" })} />
        {errors.personalInfo?.firstName && <p>{errors.personalInfo.firstName.message}</p>}
      </div>
      <div>
        <label>Last Name</label>
        <input {...register("personalInfo.lastName", { required: "Last Name is required" })} />
        {errors.personalInfo?.lastName && <p>{errors.personalInfo.lastName.message}</p>}
      </div>
      <div>
        <label>Gender</label>
        <select {...register("personalInfo.gender", { required: "Gender is required" })}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
        {errors.personalInfo?.gender && <p>{errors.personalInfo.gender.message}</p>}
      </div>
      <div>
        <label>Age</label>
        <input type="number" {...register("personalInfo.age", { valueAsNumber: true })} />
      </div>
      <div>
        <label>Favorite Genres</label>
        <Controller
          name="personalInfo.favoriteGenres"
          control={control}
          render={({ field }) => (
            <select multiple {...field}>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
          )}
        />
      </div>
      <div>
        <label>Where did you find us?</label>
        <input {...register("personalInfo.referenceSource")} />
      </div>

      <h2>Consent</h2>
      <div>
        <label>
          <input
            type="checkbox"
            {...register("consentToDataProcessing", { required: "Consent is required" })}
          />
          I consent to data processing
        </label>
        {errors.consentToDataProcessing && <p>{errors.consentToDataProcessing.message}</p>}
      </div>

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default UserDetails;