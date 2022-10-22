import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import { AddressSchema } from "Schemas";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { IUser } from "Interfaces/Auth";
import { useForm } from "react-hook-form";
import { regExp } from "Constants/General";
import { instanceOf } from "Utils/Helpers";
import Divider from "@mui/material/Divider";
import { useAppSelector } from "Store/Hooks";
import styles from "./Addresses.module.scss";
import { Address } from "Interfaces/Address";
import AddressesModal from "./AddressesModal";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import { getAddresses } from "Store/AddressSlice";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import DeleteIcon from "@mui/icons-material/Delete";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteAddressModal from "./AddressesDeleteModal";
import { City, Country, State } from "country-state-city";
import UIButton from "Components/UI/Button/Button.component";
import { IRequestProps, RQProps } from "Utils/GraphqlRequest";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { IPayloadType } from "Components/UI/Select/Select.component";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ICity, ICountry, IState } from "country-state-city/dist/lib/interface";

interface AddressPayload extends Address {
  userID: string;
}

export interface IAddressPayload {
  id?: string;
  addressDetails: AddressPayload;
}

interface IddressProps {
  user: IUser;
  loading: boolean;
  loadingFetch: boolean;
  loadingDelete: boolean;
  makeAddAddress: (payload: IAddressPayload) => Promise<any>;
  makeEditAddress: (payload: IAddressPayload) => Promise<any>;
  makeDeleteAddress: (payload: { id: string }) => Promise<any>;
  makeGetAddress: (props?: RQProps | undefined) => Promise<any>;
}

const Addresses = ({
  user,
  loading,
  loadingDelete,
  makeGetAddress,
  makeAddAddress,
  makeEditAddress,
  makeDeleteAddress,
}: IddressProps) => {
  const [toDelete, setToDelete] = useState<string>("");
  const [type, setType] = useState<"add" | "edit">("add");
  const [states, setStates] = useState<IPayloadType[]>([]);
  const [cities, setCities] = useState<IPayloadType[]>([]);
  const [countries, setCountries] = useState<IPayloadType[]>([]);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [showAddressDeleteModal, setShowAddressDeleteModal] =
    useState<boolean>(false);
  const { addresses } = useAppSelector((state) => state.address);

  const mainAddresses = addresses.mainAddresses as Required<Address[]>;
  const subAddresses = addresses.subAddresses as Required<Address[]>;

  const listAddresses = React.useCallback(async () => {
    if (mainAddresses.length === 0 || subAddresses.length === 0) {
      let requestOptions: IRequestProps = {
        payloadOptions: {
          variables: {
            id: user.id as string,
          },
        },
        requestFunction: makeGetAddress,
      };

      await getAddresses(requestOptions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, mainAddresses, subAddresses]);

  useEffect(() => {
    listAddresses();
  }, [listAddresses]);

  const {
    reset,
    watch,
    setValue,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>({
    defaultValues: {
      _id: "",
      name: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      additionalInfo: "",
      addressType: "international",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(AddressSchema.CreateAddress),
  });

  const onSubmit = async (payload: Address, type: "add" | "edit") => {
    let successText = "";

    if (type === "add") {
      delete payload._id;

      await makeAddAddress({
        addressDetails: {
          ...payload,
          userID: user.id as string,
          state: `${State.getStateByCode(payload.state)?.name} (${
            payload.state
          })`,
          country: `${Country.getCountryByCode(payload.country)?.name} (${
            payload.country
          })`,
        },
      });

      listAddresses();
      successText = "Address has been successfully created";
    } else {
      const id = payload._id;
      delete payload._id;

      await makeEditAddress({
        id,
        addressDetails: {
          ...payload,
          userID: user.id as string,
          state: `${State.getStateByCode(payload.state)?.name} (${
            payload.state
          })`,
          country: `${Country.getCountryByCode(payload.country)?.name} (${
            payload.country
          })`,
        },
      });

      listAddresses();
      successText = "Address edited successfully";
    }

    reset();
    setShowAddressModal(false);
    toast.success(successText);
  };

  const onSubmitDelete = async () => {
    const data = await makeDeleteAddress({
      id: toDelete,
    });

    if (data) {
      toast.success(data.deleteAddress);
      listAddresses();
    }
  };

  const { state, country } = getValues();

  const extractValues = (value: ICountry | IState | ICity) => {
    if (instanceOf<ICountry | IState>(value, "isoCode")) {
      return {
        value: value.isoCode,
        text: value.name,
      };
    } else {
      return {
        value: value.name,
        text: value.name,
      };
    }
  };

  const setEditValues = (payload: Address) => {
    const {
      _id,
      name,
      city,
      state,
      country,
      postalCode,
      phoneNumber,
      addressType,
      addressLine1,
      addressLine2,
      additionalInfo,
    } = payload;

    setValue("_id", _id);
    setValue("name", name);
    setValue("city", city);
    setValue("postalCode", postalCode);
    setValue("phoneNumber", phoneNumber);
    setValue("addressType", addressType);
    setValue("addressLine1", addressLine1);
    setValue("addressLine2", addressLine2);
    setValue("additionalInfo", additionalInfo);
    setValue("state", `${regExp.exec(state)?.[1]}`);
    setValue("country", `${regExp.exec(country)?.[1]}`);

    setType("edit");
    setShowAddressModal(true);
  };

  const deleteAddress = (id: string) => {
    setToDelete(id);
    setShowAddressDeleteModal(true);
  };

  useEffect(() => {
    if (country) {
      setStates(State.getStatesOfCountry(country).map(extractValues));
    }
  }, [country]);

  useEffect(() => {
    if (country && state) {
      setCities(City.getCitiesOfState(country, state).map(extractValues));
    }
  }, [country, state]);

  useEffect(() => {
    setCountries(
      Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        text: country.name,
      }))
    );
  }, []);

  const breadcrumbs = [
    <Link key="1" to="/settings">
      <span style={{ color: "#000" }}>Settings</span>
    </Link>,
    <Link key="2" to="/settings/addresses">
      <span style={{ color: "#000" }}>Address</span>
    </Link>,
  ];

  const showAddress = (index: number, address: Address) => {
    const { name, state, country, phoneNumber } = address;

    return (
      <Box
        key={index}
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            pb: ".7rem",
          }}
        >
          <Typography>{`${name}, ${phoneNumber}, ${country
            .replace(regExp, "")
            .trim()}, ${state.replace(regExp, "").trim()}`}</Typography>
        </Box>
        <span
          style={{
            height: "1rem",
            marginLeft: "2rem",
            display: "inline-block",
          }}
        >
          <EditIcon
            sx={{
              mr: 2,
              color: "#8bbd78",
              cursor: "pointer",
            }}
            onClick={() => {
              setEditValues(address);
            }}
          />
          <DeleteIcon
            sx={{
              color: "#E6534E",
              cursor: "pointer",
            }}
            onClick={() => {
              deleteAddress(address._id as string);
            }}
          />
        </span>
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to="/settings">
          <Box
            sx={{
              py: ".3rem",
              px: ".5rem",
              mr: "1.5rem",
              borderRadius: ".5rem",
              border: ".1rem solid #ddd",
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </Box>
        </Link>
        <Stack spacing={2}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ justifyContent: "center" }}
            separator={<NavigateNextIcon fontSize="small" />}
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Box>
      <Box className={styles.addresses__section}>
        <Box className={styles.addresses__section___aside}>
          <Typography variant="h5">Address Book</Typography>
          <Typography
            sx={{
              mt: ".5rem",
              color: "#979797",
            }}
          >
            Edit, delete and add new addresses
          </Typography>
          <Box
            sx={{
              py: "2rem",
              px: "1rem",
              mt: "1.5rem",
              color: "#484747",
              backgroundColor: "#f6f6f7",
            }}
          >
            <EmojiObjectsIcon
              sx={{
                color: "#ffa64d",
                fontSize: "2.5rem",
              }}
            />
            <Typography variant="body2">
              The international address is used for deliveries abroad
            </Typography>
            <Typography variant="body2">
              The international address is also put in your shipments
              description
            </Typography>
            <Typography variant="body2">
              You can save as many local addresses for easy pickup
            </Typography>
          </Box>
        </Box>
        <Box className={styles.addresses__section___main}>
          <Box sx={{ pb: "2rem" }}>
            <Box
              sx={{
                mb: "2rem",
                display: "flex",
              }}
            >
              <Box sx={{ flexGrow: 1 }}></Box>
              <UIButton
                type="button"
                variant="contained"
                handleClick={() => {
                  setType("add");
                  setShowAddressModal(true);
                }}
              >
                Add new address
              </UIButton>
            </Box>
            <Box>
              <Typography
                sx={{
                  pb: ".8rem",
                  color: "#979797",
                }}
              >
                International Addresses
              </Typography>
            </Box>

            {mainAddresses.length > 0 ? (
              mainAddresses.map((address: Address, index: number) => {
                return showAddress(index, address);
              })
            ) : (
              <Box>No International Addresses Found</Box>
            )}
          </Box>
          <Divider />
          <Box sx={{ py: "2rem" }}>
            <Box>
              <Typography
                sx={{
                  pb: ".8rem",
                  color: "#979797",
                }}
              >
                Local Addresses
              </Typography>
            </Box>

            {subAddresses.length > 0 ? (
              subAddresses.map((address: Address, index: number) => {
                return showAddress(index, address);
              })
            ) : (
              <Typography>No Local Addresses Found</Typography>
            )}
          </Box>
        </Box>
      </Box>
      <AddressesModal
        type={type}
        reset={reset}
        watch={watch}
        errors={errors}
        cities={cities}
        states={states}
        loading={loading}
        register={register}
        setValue={setValue}
        onSubmit={onSubmit}
        getValues={getValues}
        countries={countries}
        handleSubmit={handleSubmit}
        showAddressModal={showAddressModal}
        setShowAddressModal={setShowAddressModal}
        title={type === "add" ? "Add New Address" : "Edit Address"}
      />
      <DeleteAddressModal
        loading={loadingDelete}
        onSubmitDelete={onSubmitDelete}
        showModal={showAddressDeleteModal}
        setShowModal={setShowAddressDeleteModal}
      />
    </>
  );
};

export default Addresses;
