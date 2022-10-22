import {
  FieldError,
  UseFormReset,
  UseFormWatch,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
  UseFormHandleSubmit,
} from "react-hook-form";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Address } from "Interfaces/Address";
import UIModal from "Components/UI/Modal/Modal.component";
import UIInput from "Components/UI/Input/Input.component";
import CustomPhoneInput from "Components/UI/PhoneInput/PhoneInput";
import { UILoadingButton } from "Components/UI/Button/Button.component";
import UISelect, { IPayloadType } from "Components/UI/Select/Select.component";

type IAddress = Partial<Record<keyof Address, FieldError | undefined>>;

interface IAddressesModal {
  title: string;
  loading: boolean;
  errors: IAddress;
  type: "add" | "edit";
  cities: IPayloadType[];
  states: IPayloadType[];
  showAddressModal: boolean;
  countries: IPayloadType[];
  reset: UseFormReset<Address>;
  watch: UseFormWatch<Address>;
  register: UseFormRegister<Address>;
  setValue: UseFormSetValue<Address>;
  getValues: UseFormGetValues<Address>;
  handleSubmit: UseFormHandleSubmit<Address>;
  setShowAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (payload: Address, type: "add" | "edit") => Promise<void>;
}

const AddressesModal = ({
  type,
  reset,
  watch,
  title,
  errors,
  states,
  cities,
  loading,
  register,
  onSubmit,
  setValue,
  countries,
  getValues,
  showAddressModal,
  handleSubmit,
  setShowAddressModal,
}: IAddressesModal) => {
  const { ref: cityRef, ...cityRest } = register("city");
  const { ref: stateRef, ...stateRest } = register("state");
  const { ref: emailRef, ...emailRest } = register("email");
  const { ref: addressRef, ...addressRest } = register("name");
  const { ref: countryRef, ...countryRest } = register("country");
  const { ref: postalCodeRef, ...postalCodeRest } = register("postalCode");
  const { ref: addressTypeRef, ...addressTypeRest } = register("addressType");
  const { ref: phoneNumberRef, ...phoneNumberRest } = register("phoneNumber");
  const { ref: additionalRef, ...additionalRest } = register("additionalInfo");
  const { ref: addressLine1Ref, ...addressLine1Rest } =
    register("addressLine1");
  const { ref: addressLine2Ref, ...addressLine2Rest } =
    register("addressLine2");

  return (
    <UIModal
      title={title}
      open={showAddressModal}
      handleClose={() => {
        setShowAddressModal(false);
        reset();
      }}
    >
      <Box
        noValidate
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit((payload: Address) => {
          onSubmit(payload, type);
        })}
      >
        <Box>
          <Grid
            container
            spacing={2}
            sx={{ mt: 4, "& .MuiGrid-item": { paddingTop: "0px" } }}
          >
            <Grid item xs={6}>
              <UIInput
                type="text"
                {...addressRest}
                refs={addressRef}
                error={!!errors.name}
                label="Recepient Name"
              />
              {errors.name && (
                <span className="v-error">{errors.name.message}</span>
              )}
            </Grid>
            <Grid item xs={6}>
              <CustomPhoneInput
                type="number"
                {...phoneNumberRest}
                label="Phone Number"
                refs={phoneNumberRef}
                onChange={(name, value) => {
                  setValue(name as keyof Address, value);
                }}
                error={!!errors.phoneNumber}
                value={getValues("phoneNumber")}
              />
              {errors.phoneNumber && (
                <span className="v-error">{errors.phoneNumber.message}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <UIInput
                type="text"
                {...emailRest}
                refs={emailRef}
                label="Email Address"
                error={!!errors.email}
              />
              {errors.name && (
                <span className="v-error">{errors.name.message}</span>
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
              />
              {errors.city && (
                <span className="v-error">{errors.city.message}</span>
              )}
            </Grid>
            <Grid item xs={6}>
              <UIInput
                type="text"
                {...postalCodeRest}
                label="Postal Code"
                refs={postalCodeRef}
                error={!!errors.postalCode}
              />
              {errors.postalCode && (
                <span className="v-error">{errors.postalCode.message}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <UIInput
                type="text"
                {...addressLine1Rest}
                label="Address Line 1"
                refs={addressLine1Ref}
                error={!!errors.addressLine1}
              />
              {errors.addressLine1 && (
                <span className="v-error">{errors.addressLine1.message}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <UIInput
                type="text"
                {...addressLine2Ref}
                label="Address Line 2"
                refs={addressLine2Rest}
                error={!!errors.addressLine2}
              />
              {errors.addressLine2 && (
                <span className="v-error">{errors.addressLine2.message}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <UIInput
                multiline
                maxRows={4}
                type="text"
                {...additionalRest}
                refs={additionalRef}
                error={!!errors.additionalInfo}
                label="Additional information / Landmark"
              />
              {errors.additionalInfo && (
                <span className="v-error">{errors.additionalInfo.message}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <UISelect
                emptyValue
                label="Address Type"
                {...addressTypeRest}
                refs={addressTypeRef}
                error={!!errors.addressType}
                value={watch("addressType")}
                options={[
                  { text: "International Address", value: "international" },
                  { text: "Local Address", value: "local" },
                ]}
              />
              {errors.addressType && (
                <span className="v-error">{errors.addressType.message}</span>
              )}
            </Grid>
          </Grid>
        </Box>
        <UILoadingButton
          size="large"
          type="submit"
          loading={loading}
          variant="contained"
          styles={{ marginTop: "2rem" }}
        >
          Save Address
        </UILoadingButton>
      </Box>
    </UIModal>
  );
};

export default AddressesModal;
