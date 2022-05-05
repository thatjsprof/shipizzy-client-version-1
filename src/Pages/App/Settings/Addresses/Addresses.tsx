import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import styles from "./Addresses.module.scss";
import UIButton from "../../../../Components/UI/Button/Button.component";
import UIInput from "../../../../Components/UI/Input/Input.component";
import UIModal from "../../../../Components/UI/Modal/Modal.component";
import UISelect from "../../../../Components/UI/Select/Select.component";

interface IPayload {
  recepientName: string;
  phoneNumber: string;
  state: string;
  city: string;
  additionalInfo: string;
  status?: boolean;
}
interface PayloadFromAPI {
  [index: string]: any;
  mainAddresses: Array<IPayload>;
  subAddresses: Array<IPayload>;
}

const Addresses = () => {
  const [newAddress, setNewAddress] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<PayloadFromAPI>({
    mainAddresses: [
      {
        recepientName: "David Ajayi",
        phoneNumber: "08091289193",
        state: "lagos",
        city: "ibeju-lekki",
        additionalInfo: "Besides Awoyaya street",
      },
      {
        recepientName: "Samuel Ajayi",
        phoneNumber: "08021543193",
        state: "lagos",
        city: "ibeju-lekki",
        additionalInfo: "Besides Dangote street",
      },
    ],
    subAddresses: [
      {
        recepientName: "David Ajayi",
        phoneNumber: "07082198323",
        state: "lagos",
        city: "ibeju-lekki",
        additionalInfo: "Besides Otedola close",
      },
    ],
  });

  const setFormState = (value: string, index: number) => {
    setAddresses((prevAddresses) => {
      const newAddresses = [...prevAddresses[value]];

      newAddresses.splice(index, 1, {
        ...newAddresses[index],
        status: !newAddresses[index].status,
      });

      return {
        ...prevAddresses,
        [value]: Array.isArray(prevAddresses[value])
          ? newAddresses
          : !prevAddresses[value],
      };
    });
  };

  useEffect(() => {
    // Do storing of addresses in here
    setAddresses((addresses: PayloadFromAPI) => {
      const { mainAddresses, subAddresses } = addresses;

      return {
        ...addresses,
        mainAddresses: mainAddresses.map((address: IPayload) => ({
          ...address,
          status: false,
        })),
        subAddresses: subAddresses.map((address: IPayload) => ({
          ...address,
          status: false,
        })),
      };
    });
  }, []);

  const breadcrumbs = [
    <Link key="1" to="/settings">
      <span style={{ color: "#000" }}>Settings</span>
    </Link>,
    <Link key="2" to="/settings/addresses">
      <span style={{ color: "#000" }}>Address</span>
    </Link>,
  ];

  const { subAddresses, mainAddresses } = addresses;

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link to="/settings">
          <Box
            sx={{
              border: ".1rem solid #ddd",
              py: ".3rem",
              px: ".5rem",
              borderRadius: ".5rem",
              mr: "1.5rem",
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </Box>
        </Link>
        <Stack spacing={2}>
          <Breadcrumbs
            sx={{ justifyContent: "center" }}
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Box>
      <Box className={styles.addresses__section}>
        <Box className={styles.addresses__section___aside}>
          <Typography variant="h5">Address Book</Typography>
          <Typography sx={{ color: "#979797", mt: ".5rem" }}>
            Edit, delete and add new addresses
          </Typography>
          <Box
            sx={{
              backgroundColor: "#f6f6f7",
              py: "2rem",
              px: "1rem",
              mt: "1.5rem",
              color: "#484747",
            }}
          >
            <EmojiObjectsIcon sx={{ fontSize: "2.5rem", color: "#ffa64d" }} />
            <Typography variant="body2">
              The main address is used when you schedule a pickup
            </Typography>
            <Typography variant="body2">
              Your main address is also put in your shipments description
            </Typography>
            <Typography variant="body2">
              You can save as many sub addresses for easy checkout
            </Typography>
          </Box>
        </Box>
        <Box className={styles.addresses__section___main}>
          <Box sx={{ pb: "2rem" }}>
            <Box sx={{ display: "flex", mb: "2rem" }}>
              <Box sx={{ flexGrow: 1 }}></Box>
              <UIButton
                type="button"
                variant="contained"
                handleClick={() => setNewAddress(true)}
              >
                Add new address
              </UIButton>
            </Box>
            <Box>
              <Typography sx={{ color: "#979797", pb: ".8rem" }}>
                Main Addresses
              </Typography>
            </Box>

            {mainAddresses.map((address: IPayload, index: number) => {
              const {
                recepientName,
                phoneNumber,
                state,
                city,
                additionalInfo,
                status,
              } = address;

              return (
                <Box sx={{ display: "flex" }} key={index}>
                  <Box sx={{ flexGrow: 1, pb: ".7rem" }}>
                    {status ? (
                      <Box sx={{ mt: "1rem" }}>
                        <UIInput
                          type="text"
                          value={recepientName}
                          label="Recepient Name"
                        />
                        <UIInput
                          type="number"
                          value={phoneNumber}
                          label="Phone Number"
                        />
                        <UISelect
                          value={state}
                          label="State"
                          options={[{ text: "Lagos", value: "lagos" }]}
                        />
                        <UISelect
                          value={city}
                          label="City"
                          options={[
                            { text: "Ibeju Lekki", value: "ibeju-lekki" },
                          ]}
                        />
                        <UIInput
                          value={additionalInfo}
                          type="text"
                          multiline
                          maxRows={4}
                          label="Additional information / Landmark"
                        />
                        <UIButton
                          type="button"
                          size="large"
                          styles={{
                            marginBottom:
                              index !== mainAddresses.length - 1
                                ? "2rem"
                                : "0rem",
                          }}
                          variant="contained"
                        >
                          Save
                        </UIButton>
                      </Box>
                    ) : (
                      <Typography>{`${recepientName}, ${phoneNumber}, ${city}, ${state}`}</Typography>
                    )}
                  </Box>
                  <span
                    style={{
                      color: "#003366",
                      marginLeft: "2rem",
                      cursor: "pointer",
                      display: "inline-block",
                      height: "1rem",
                    }}
                    onClick={() => setFormState("mainAddresses", index)}
                  >
                    {status ? "Close" : "Edit"}
                  </span>
                </Box>
              );
            })}
          </Box>
          <Divider />
          <Box sx={{ py: "2rem" }}>
            <Box>
              <Typography sx={{ color: "#979797", pb: ".8rem" }}>
                Sub Addresses
              </Typography>
            </Box>

            {subAddresses.map((address: IPayload, index: number) => {
              const {
                recepientName,
                phoneNumber,
                state,
                city,
                additionalInfo,
                status,
              } = address;

              return (
                <Box sx={{ display: "flex" }} key={index}>
                  <Box sx={{ flexGrow: 1, pb: ".7rem" }}>
                    {status ? (
                      <Box sx={{ mt: "1rem" }}>
                        <UIInput
                          type="text"
                          value={recepientName}
                          label="Recepient Name"
                        />
                        <UIInput
                          type="number"
                          value={phoneNumber}
                          label="Phone Number"
                        />
                        <UISelect
                          value={state}
                          label="State"
                          options={[{ text: "Lagos", value: "lagos" }]}
                        />
                        <UISelect
                          value={city}
                          label="City"
                          options={[
                            { text: "Ibeju Lekki", value: "ibeju-lekki" },
                          ]}
                        />
                        <UIInput
                          value={additionalInfo}
                          type="text"
                          multiline
                          maxRows={4}
                          label="Additional information / Landmark"
                        />
                        <UIButton
                          type="button"
                          size="large"
                          styles={{
                            marginBottom:
                              index !== subAddresses.length - 1
                                ? "2rem"
                                : "0rem",
                          }}
                          variant="contained"
                        >
                          Save
                        </UIButton>
                      </Box>
                    ) : (
                      <Typography>{`${recepientName}, ${phoneNumber}, ${city}, ${state}`}</Typography>
                    )}
                  </Box>
                  <span
                    style={{
                      color: "#003366",
                      marginLeft: "2rem",
                      cursor: "pointer",
                      display: "inline-block",
                      height: "1rem",
                    }}
                    onClick={() => setFormState("subAddresses", index)}
                  >
                    {status ? "Close" : "Edit"}
                  </span>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <UIModal
        open={newAddress}
        title="Add New Address"
        handleClose={() => setNewAddress(false)}
      >
        <UIInput type="text" label="Recepient Name" />
        <UIInput type="number" label="Phone Number" />
        <UISelect label="State" options={[{ text: "Lagos", value: "lagos" }]} />
        <UISelect
          label="City"
          options={[{ text: "Ibeju Lekki", value: "ibeju-lekki" }]}
        />
        <UIInput
          type="text"
          multiline
          maxRows={4}
          label="Additional information / Landmark"
        />
        <UISelect
          defaultValue="main"
          emptyValue={false}
          label="Address Type"
          options={[
            { text: "Main Address", value: "main" },
            { text: "Sub Address", value: "sub" },
          ]}
        />
        <UIButton
          type="button"
          size="large"
          disabled
          styles={{ marginTop: "2rem" }}
          variant="contained"
        >
          Save Address
        </UIButton>
      </UIModal>
    </div>
  );
};

export default Addresses;
