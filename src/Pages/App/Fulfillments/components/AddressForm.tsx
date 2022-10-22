import {
  FieldError,
  UseFormReset,
  UseFormWatch,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import React from "react";
import Grid from "@mui/material/Grid";
import { Address } from "Interfaces/Address";
import MapIcon from "@mui/icons-material/Map";
import TourIcon from "@mui/icons-material/Tour";
import PublicIcon from "@mui/icons-material/Public";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomPhoneInput from "Components/UI/PhoneInput/PhoneInput";
import UIOutlinedInput from "Components/UI/Input/OutlinedInput.component";
import UISelect, { IPayloadType } from "Components/UI/Select/Select.component";

type IAddress = Partial<Record<keyof Address, FieldError | undefined>>;

interface IAddressForm {
  errors: IAddress;
  cities: IPayloadType[];
  states: IPayloadType[];
  countries: IPayloadType[];
  reset: UseFormReset<Address>;
  watch: UseFormWatch<Address>;
  register: UseFormRegister<Address>;
  setValue: UseFormSetValue<Address>;
  getValues: UseFormGetValues<Address>;
}

const AddressForm = ({
  watch,
  errors,
  states,
  cities,
  setValue,
  register,
  countries,
  getValues,
}: IAddressForm) => {
  const { ref: cityRef, ...cityRest } = register("city");
  const { ref: stateRef, ...stateRest } = register("state");
  const { ref: emailRef, ...emailRest } = register("email");
  const { ref: addressRef, ...addressRest } = register("name");
  const { ref: countryRef, ...countryRest } = register("country");
  const { ref: postalCodeRef, ...postalCodeRest } = register("postalCode");
  const { ref: phoneNumberRef, ...phoneNumberRest } = register("phoneNumber");
  const { ref: additionalRef, ...additionalRest } = register("additionalInfo");
  const { ref: addressLine1Ref, ...addressLine1Rest } =
    register("addressLine1");
  const { ref: addressLine2Ref, ...addressLine2Rest } =
    register("addressLine2");

  return (
    <>
      <Grid item xs={6}>
        <UIOutlinedInput
          type="text"
          {...addressRest}
          refs={addressRef}
          variant="outlined"
          label="Sender Name"
          error={!!errors.name}
          startAdornment={
            <AccountCircleIcon
              sx={{
                mr: 2,
                color: "#586274",
              }}
            />
          }
        />
        {errors.name && <span className="v-error">{errors.name.message}</span>}
      </Grid>
      <Grid item xs={6}>
        <CustomPhoneInput
          type="number"
          {...phoneNumberRest}
          label="Phone Number"
          refs={phoneNumberRef}
          error={!!errors.phoneNumber}
          value={getValues("phoneNumber")}
          customStyles={{
            backgroundColor: "transparent!important",
          }}
          onChange={(name, value) => {
            setValue(name as keyof Address, value);
          }}
        />
        {errors.phoneNumber && (
          <span className="v-error">{errors.phoneNumber.message}</span>
        )}
      </Grid>
      <Grid item xs={12}>
        <UIOutlinedInput
          type="text"
          {...emailRest}
          refs={emailRef}
          variant="outlined"
          label="Email Address"
          error={!!errors.email}
          startAdornment={
            <AccountCircleIcon
              sx={{
                mr: 2,
                color: "#586274",
              }}
            />
          }
        />
        {errors.email && (
          <span className="v-error">{errors.email.message}</span>
        )}
      </Grid>
      <Grid item xs={12}>
        <UIOutlinedInput
          type="text"
          variant="outlined"
          {...addressLine1Rest}
          label="Address Line 1"
          refs={addressLine1Ref}
          error={!!errors.addressLine1}
          startAdornment={
            <MapIcon
              sx={{
                mr: 2,
                color: "#586274",
              }}
            />
          }
        />
        {errors.addressLine1 && (
          <span className="v-error">{errors.addressLine1.message}</span>
        )}
      </Grid>
      <Grid item xs={12}>
        <UIOutlinedInput
          type="text"
          variant="outlined"
          {...addressLine2Ref}
          label="Address Line 2"
          refs={addressLine2Rest}
          error={!!errors.addressLine2}
          startAdornment={
            <MapIcon
              sx={{
                mr: 2,
                color: "#586274",
              }}
            />
          }
        />
        {errors.addressLine2 && (
          <span className="v-error">{errors.addressLine2.message}</span>
        )}
      </Grid>
      <Grid item xs={6}>
        <UISelect
          label="Country"
          {...countryRest}
          refs={countryRef}
          options={countries}
          value={watch("country")}
          error={!!errors.country}
          startAdornment={
            <PublicIcon
              sx={{
                mr: 2,
                color: "#586274",
              }}
            />
          }
        />
        {errors.country && (
          <span className="v-error">{errors.country.message}</span>
        )}
      </Grid>
      <Grid item xs={6}>
        <UISelect
          label="State"
          {...stateRest}
          refs={stateRef}
          options={states}
          value={watch("state")}
          error={!!errors.state}
          startAdornment={
            <TourIcon
              sx={{
                mr: 2,
                color: "#586274",
              }}
            />
          }
        />
        {errors.state && (
          <span className="v-error">{errors.state.message}</span>
        )}
      </Grid>
      <Grid item xs={6}>
        <UISelect
          label="City"
          {...cityRest}
          refs={cityRef}
          options={cities}
          value={watch("city")}
          error={!!errors.city}
          startAdornment={
            <TourIcon
              sx={{
                mr: 2,
                color: "#586274",
              }}
            />
          }
        />
        {errors.city && <span className="v-error">{errors.city.message}</span>}
      </Grid>
      <Grid item xs={6}>
        <UIOutlinedInput
          type="number"
          variant="outlined"
          {...postalCodeRest}
          label="Postal Code"
          refs={postalCodeRef}
          error={!!errors.postalCode}
          startAdornment={<MapIcon sx={{ mr: 2, color: "#586274" }} />}
        />
        {errors.postalCode && (
          <span className="v-error">{errors.postalCode.message}</span>
        )}
      </Grid>
      <Grid item xs={12}>
        <UIOutlinedInput
          multiline
          maxRows={4}
          type="text"
          variant="outlined"
          {...additionalRest}
          refs={additionalRef}
          error={!!errors.additionalInfo}
          label="Additional information / Landmark"
          startAdornment={
            <MapIcon
              sx={{
                mr: 2,
                color: "#586274",
              }}
            />
          }
        />
        {errors.additionalInfo && (
          <span className="v-error">{errors.additionalInfo.message}</span>
        )}
      </Grid>
    </>
  );
};

export default AddressForm;
