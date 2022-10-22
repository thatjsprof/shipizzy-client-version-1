import {
  IPayloadInt,
  IFulfillment,
  FulfillmentStages,
} from "Interfaces/Fulfillment";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { graphql } from "react-apollo";
import { AddressSchema } from "Schemas";
import { IUser } from "Interfaces/Auth";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { regExp } from "Constants/General";
import { Address } from "Interfaces/Address";
import MenuItem from "@mui/material/MenuItem";
import CheckBox from "@mui/material/Checkbox";
import MapIcon from "@mui/icons-material/Map";
import { flowRight as compose } from "lodash";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import { getAddresses } from "Store/AddressSlice";
import React, { useState, useEffect } from "react";
import { mapAddress } from "Constants/JSXSnippets";
import FormControl from "@mui/material/FormControl";
import { Country, State } from "country-state-city";
import AddressForm from "../components/AddressForm";
import { emptyAddress } from "Constants/Fulfillment";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditFulfillmentResponse } from "Graphql/Responses";
import { useAppDispatch, useAppSelector } from "Store/Hooks";
import { IRequestProps, RQProps } from "Utils/GraphqlRequest";
import FormControlLabel from "@mui/material/FormControlLabel";
import { setFulfillmentOption } from "Store/FulfillmentSlice";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useCountryStateCityHook from "Hooks/CountryStateCityHook";
import { UILoadingButton } from "Components/UI/Button/Button.component";
import { GET_ADDRESS } from "Graphql/Resolvers/Addresses/Addresses.mutationdefs";

interface IProps {
  handleBack: () => void;
  handleNext: () => void;
  makeEditUser: (payload: any) => Promise<Record<"editUser", IUser>>;
  editFulfillment: (payload: IPayloadInt) => EditFulfillmentResponse;
  getAddress: (props?: RQProps) => Promise<Record<"getAddress", Address>>;
}

const FulfillmentsSender = ({ getAddress, editFulfillment }: IProps) => {
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState<string>("");
  const [saveAddress, setSaveAddress] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [savedAddress, setSavedAddress] = useState(false);
  const { addresses } = useAppSelector((state) => state.address);
  const fulfillment = useAppSelector((state) => state.fulfillment);

  const { fulfillmentSender } = fulfillment;

  const {
    reset,
    watch,
    setValue,
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm<Address>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: emptyAddress("local"),
    resolver: yupResolver(AddressSchema.CreateAddress),
  });

  const handleNextChange = async () => {
    setLoading(true);

    let requestObject = {} as Address;

    if (savedAddress) {
      const selectedAddress = subAddresses.find(
        (addressSelected) => addressSelected._id === address
      ) as Address;

      const { __typename, ...rest } = selectedAddress;

      requestObject = {
        ...rest,
      };
    } else {
      const formValues = getValues();

      requestObject = {
        ...requestObject,
        ...formValues,
        state: `${State.getStateByCode(formValues.state)?.name} (${
          formValues.state
        })`,
        country: `${Country.getCountryByCode(formValues.country)?.name} (${
          formValues.country
        })`,
      };
    }

    const fulfillmentDetails: IFulfillment = {
      senderAddress: requestObject,
    };

    const toDispatch = {
      fulfillmentSender: {
        ...requestObject,
      },
    };

    let data = null;

    if ((savedAddress && fulfillmentSender?._id !== address) || !savedAddress) {
      data = await editFulfillment({
        fulfillmentDetails,
        id: fulfillment.id as string,
      });
    } else {
      dispatch(
        setFulfillmentOption({
          stage: FulfillmentStages["receiver"],
        })
      );
    }

    if (data?.editFulfillment._id) {
      setLoading(false);

      reset();

      dispatch(
        setFulfillmentOption({
          stage: FulfillmentStages["receiver"],
          ...toDispatch,
        })
      );
    } else setLoading(false);
  };

  const handleNextBack = () => {
    dispatch(
      setFulfillmentOption({
        stage: FulfillmentStages["type"],
      })
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSavedAddress(event.target.checked);

    if (event.target.checked === false) {
      reset();
      setAddress("");
      dispatch(
        setFulfillmentOption({
          fulfillmentSender: null,
        })
      );
    }
  };

  const handleSaveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaveAddress(event.target.checked);
  };

  const handleAddressChange = (event: SelectChangeEvent) => {
    setAddress(event.target.value as string);
  };

  const subAddresses = addresses.subAddresses as Required<Address[]>;

  const listAddresses = React.useCallback(async () => {
    if (subAddresses.length === 0) {
      let requestOptions: IRequestProps = {
        payloadOptions: {
          variables: {
            id: user.id as string,
          },
        },
        requestFunction: getAddress,
      };

      await getAddresses(requestOptions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, subAddresses]);

  useEffect(() => {
    listAddresses();
  }, [listAddresses]);

  useEffect(() => {
    const senderID = fulfillmentSender?._id;

    if (senderID) {
      setSavedAddress(true);
      setAddress(senderID);
    }
  }, [fulfillmentSender?._id]);

  useEffect(() => {
    const getString = (value = "") =>
      (regExp.exec(value ?? "")?.[1] as string) || "";

    setValue("addressType", "local");
    setValue("name", fulfillmentSender?.name || "");
    setValue("city", fulfillmentSender?.city || "");
    setValue("email", fulfillmentSender?.email || "");
    setValue("state", getString(fulfillmentSender?.state));
    setValue("country", getString(fulfillmentSender?.country));
    setValue("postalCode", fulfillmentSender?.postalCode || "");
    setValue("phoneNumber", fulfillmentSender?.phoneNumber || "");
    setValue("addressLine1", fulfillmentSender?.addressLine1 || "");
    setValue("addressLine2", fulfillmentSender?.addressLine2 || "");
    setValue("additionalInfo", fulfillmentSender?.additionalInfo || "");
  }, [fulfillmentSender, setValue]);

  const { state, country } = getValues();

  const { countries, states, cities } = useCountryStateCityHook({
    state,
    country,
  });

  return (
    <Box>
      <Box
        sx={{
          p: 2,
          display: "grid",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "50rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              marginTop: "2rem",
              letterSpacing: "1px",
            }}
          >
            {`Sender's Information`}
          </Typography>
          <Typography
            sx={{
              mt: 1,
              color: "#424a57",
            }}
          >
            {`Please provide the Sender's information`}
          </Typography>

          <Box sx={{ marginTop: "3rem" }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  paddingTop: "0px",
                }}
              >
                <Box sx={{ flexGrow: 1 }}></Box>
                <FormControlLabel
                  control={
                    <CheckBox
                      sx={{
                        mr: 1,
                      }}
                      checked={savedAddress}
                      onChange={handleChange}
                      inputProps={{
                        "aria-label": "controlled",
                      }}
                    />
                  }
                  sx={{
                    color: "#586274",
                    marginRight: "0px",
                  }}
                  label="Use a Saved Address"
                />
              </Grid>

              {savedAddress ? (
                <>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="saved-addresses">
                        Select an Address
                      </InputLabel>
                      <Select
                        value={address}
                        id="saved-addresses"
                        label="Select an Address"
                        onChange={handleAddressChange}
                        startAdornment={
                          <MapIcon
                            sx={{
                              mr: 2,
                              color: "#586274",
                            }}
                          />
                        }
                      >
                        {subAddresses.length > 0 ? (
                          mapAddress(subAddresses)
                        ) : (
                          <MenuItem>No Address Found</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              ) : (
                <>
                  <AddressForm
                    reset={reset}
                    watch={watch}
                    errors={errors}
                    cities={cities}
                    states={states}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                    countries={countries}
                  />
                </>
              )}
            </Grid>

            {!savedAddress && (
              <FormControlLabel
                control={
                  <CheckBox
                    sx={{
                      mr: 1,
                    }}
                    checked={saveAddress}
                    onChange={handleSaveChange}
                    inputProps={{
                      "aria-label": "controlled",
                    }}
                  />
                }
                sx={{
                  display: "flex",
                  color: "#586274",
                }}
                label="Save this Address"
              />
            )}

            <Box sx={{ display: "flex", marginTop: "55px" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Button
                  size="large"
                  variant="outlined"
                  onClick={handleNextBack}
                >
                  Back
                </Button>
              </Box>
              <UILoadingButton
                size="large"
                type="button"
                loading={loading}
                variant="contained"
                handleClick={handleNextChange}
                disabled={!address && !isValid}
              >
                Next
              </UILoadingButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default compose(graphql(GET_ADDRESS, { name: "getAddress" }))(
  FulfillmentsSender
);
