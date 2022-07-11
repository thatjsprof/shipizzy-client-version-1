import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { IUser } from "Interfaces/Auth";
import { useForm } from "react-hook-form";
import { setUser } from "Store/UserSlice";
import styles from "./Profile.module.scss";
import Divider from "@mui/material/Divider";
import { useAppDispatch } from "Store/Hooks";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import UIInput from "Components/UI/Input/Input.component";
import UISelect from "Components/UI/Select/Select.component";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { setDateToGmt, UppercaseTransform } from "Utils/Helpers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { UILoadingButton } from "Components/UI/Button/Button.component";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface IProfileProps {
  user: IUser;
  editUser: any;
  loading: boolean;
  checkPassword: any;
}

const Profile = ({ editUser, user, loading }: IProfileProps) => {
  const dispatch = useAppDispatch();
  const [activeField, setActiveField] = useState<string>("");
  const [showFields, setShowFields] = useState<{ [index: string]: boolean }>({
    sex: false,
    name: false,
    rcNumber: false,
    dateOfBirth: false,
    phoneNumber: false,
    businessName: false,
  });

  const { watch, register, setValue, getValues } = useForm<IUser>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      sex: user.sex,
      lastName: user.lastName,
      rcNumber: user.rcNumber,
      firstName: user.firstName,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      businessName: user.businessName,
    },
  });

  const { ref: businessNameRef, ...businessNameRest } =
    register("businessName");
  const { ref: sexRef, ...sexRest } = register("sex");
  const { ref: phoneRef, ...phoneRest } = register("phoneNumber");
  const { ref: lastNameRef, ...lastNameRest } = register("lastName");
  const { ref: firstNameRef, ...firstNameRest } = register("firstName");

  const setFormState = (value: string) => {
    setShowFields({ ...showFields, [value]: !showFields[value] });
  };

  const closeFormState = (value: string) => {
    setShowFields({ ...showFields, [value]: false });
  };

  const breadcrumbs = [
    <Link key="1" to="/settings">
      <span style={{ color: "#000" }}>Settings</span>
    </Link>,
    <Link key="2" to="/settings/profile">
      <span style={{ color: "#000" }}>Profile</span>
    </Link>,
  ];

  const { name, phoneNumber, sex, businessName, dateOfBirth } = showFields;

  const onSubmit = async (value: any) => {
    setActiveField(value);

    const payload: { [index: string]: any } = {
      isVerified: user.isVerified,
    };

    if (value === "name") {
      payload[value] = `${getValues("firstName")} ${getValues("lastName")}`;
    } else {
      payload[value] = getValues(value);
    }

    const data = await editUser({
      userID: user.id,
      userDetails: payload,
    });

    if (data) {
      const returnedData = data.editUser;
      const splitName = returnedData.name.split(" ");

      dispatch(
        setUser({
          user: {
            ...user,
            sex: returnedData.sex,
            lastName: splitName[1],
            firstName: splitName[0],
            dateOfBirth: returnedData.dateOfBirth,
            phoneNumber: returnedData.phoneNumber,
          },
        })
      );
      closeFormState(value);
      toast.success("Profile Updated Successfully");
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to="/settings">
          <Box
            sx={{
              px: ".5rem",
              py: ".3rem",
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
      <Box className={styles.profile__section}>
        <Box className={styles.profile__section___aside}>
          <Typography variant="h5">Personal Information</Typography>
          <Typography sx={{ color: "#979797", mt: ".5rem" }}>
            Edit your name, phone number and other personal details
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
              Your name is assigned to all your shipments
            </Typography>
            <Typography variant="body2">
              Your email would be used to communicate with you
            </Typography>
            <Typography variant="body2">
              All other data is used for KYC purposes, personalization and
              account recovery.
            </Typography>
          </Box>
        </Box>
        <Box className={styles.profile__section___main}>
          <Box sx={{ pb: "2rem" }}>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ flexGrow: 1, color: "#979797", pb: ".2rem" }}>
                Full Name
              </Typography>
              <span
                onClick={() => setFormState("name")}
                style={{ color: "#003366", cursor: "pointer" }}
              >
                {name ? "Close" : "Edit"}
              </span>
            </Box>
            {name ? (
              <Box sx={{ mt: "1rem" }}>
                <Box
                  sx={{
                    gap: 2,
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                  }}
                >
                  <UIInput
                    type="text"
                    label="First Name"
                    {...firstNameRest}
                    refs={firstNameRef}
                  />
                  <UIInput
                    type="text"
                    label="Last Name"
                    {...lastNameRest}
                    refs={lastNameRef}
                  />
                </Box>
                <UILoadingButton
                  size="large"
                  type="button"
                  variant="contained"
                  handleClick={() => onSubmit("name")}
                  loading={loading && activeField === "name"}
                  disabled={!watch("firstName") || !watch("lastName")}
                >
                  Save
                </UILoadingButton>
              </Box>
            ) : (
              <Typography>
                {`${user.firstName} ${user.lastName}` || "--"}
              </Typography>
            )}
          </Box>
          <Divider />
          <Box sx={{ py: "2rem" }}>
            <Typography sx={{ color: "#979797", pb: ".2rem" }}>
              Email Address
            </Typography>
            <Typography>{user.email || "---"}</Typography>
          </Box>
          <Divider />
          {user.accountType === "business" && (
            <>
              <Box sx={{ py: "2rem" }}>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{ flexGrow: 1, color: "#979797", pb: ".2rem" }}
                  >
                    Business Name
                  </Typography>
                  <span
                    onClick={() => setFormState("businessName")}
                    style={{ color: "#003366", cursor: "pointer" }}
                  >
                    {businessName ? "Close" : "Edit"}
                  </span>
                </Box>
                {businessName ? (
                  <Box sx={{ mt: "1rem" }}>
                    <UIInput
                      type="text"
                      label="Business Name"
                      {...businessNameRest}
                      refs={businessNameRef}
                    />
                    <UILoadingButton
                      size="large"
                      type="button"
                      variant="contained"
                      disabled={!watch("businessName")}
                      handleClick={() => onSubmit("businessName")}
                      loading={loading && activeField === "businessName"}
                    >
                      Save
                    </UILoadingButton>
                  </Box>
                ) : (
                  <Typography>{user.businessName || "---"}</Typography>
                )}
              </Box>
              <Divider />
              <Box sx={{ py: "2rem" }}>
                <Typography sx={{ color: "#979797", pb: ".2rem" }}>
                  RC Number
                </Typography>
                <Typography>{user.rcNumber || "---"}</Typography>
              </Box>
              <Divider />
            </>
          )}
          <Box sx={{ py: "2rem" }}>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ flexGrow: 1, color: "#979797", pb: ".2rem" }}>
                Phone Number
              </Typography>
              <span
                onClick={() => setFormState("phoneNumber")}
                style={{ color: "#003366", cursor: "pointer" }}
              >
                {phoneNumber ? "Close" : "Edit"}
              </span>
            </Box>
            {phoneNumber ? (
              <Box sx={{ mt: "1rem" }}>
                <UIInput
                  type="number"
                  {...phoneRest}
                  refs={phoneRef}
                  label="Phone Number"
                />
                <UILoadingButton
                  size="large"
                  type="button"
                  variant="contained"
                  disabled={!watch("phoneNumber")}
                  handleClick={() => onSubmit("phoneNumber")}
                  loading={loading && activeField === "phoneNumber"}
                >
                  Save
                </UILoadingButton>
              </Box>
            ) : (
              <Typography>{user.phoneNumber || "--"}</Typography>
            )}
          </Box>
          {user.accountType === "individual" && (
            <>
              <Divider />
              <Box sx={{ py: "2rem" }}>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{ flexGrow: 1, color: "#979797", pb: ".2rem" }}
                  >
                    Date of birth
                  </Typography>
                  <span
                    onClick={() => setFormState("dateOfBirth")}
                    style={{ color: "#003366", cursor: "pointer" }}
                  >
                    {dateOfBirth ? "Close" : "Edit"}
                  </span>
                </Box>
                {dateOfBirth ? (
                  <Box sx={{ mt: "1rem" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        maxDate={new Date()}
                        label="Date of Birth"
                        value={watch("dateOfBirth")}
                        onChange={(newValue) => {
                          setValue("dateOfBirth", newValue);
                        }}
                        renderInput={(params) => {
                          return <UIInput type="text" {...params} />;
                        }}
                      />
                    </LocalizationProvider>
                    <UILoadingButton
                      size="large"
                      type="button"
                      variant="contained"
                      disabled={!watch("dateOfBirth")}
                      handleClick={() => onSubmit("dateOfBirth")}
                      loading={loading && activeField === "dateOfBirth"}
                    >
                      Save
                    </UILoadingButton>
                  </Box>
                ) : (
                  <Typography>
                    {setDateToGmt(user.dateOfBirth as string) || "--"}
                  </Typography>
                )}
              </Box>
              <Divider />
              <Box sx={{ py: "2rem" }}>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{ flexGrow: 1, color: "#979797", pb: ".2rem" }}
                  >
                    Sex
                  </Typography>
                  <span
                    onClick={() => setFormState("sex")}
                    style={{ color: "#003366", cursor: "pointer" }}
                  >
                    {sex ? "Close" : "Edit"}
                  </span>
                </Box>
                {sex ? (
                  <Box sx={{ mt: "1rem" }}>
                    <UISelect
                      emptyValue
                      {...sexRest}
                      refs={sexRef}
                      label="Select your Sex"
                      disabled={!watch("sex")}
                      value={watch("sex") as string}
                      options={[
                        { text: "Male", value: "male" },
                        { text: "Female", value: "female" },
                        { text: "Trans", value: "trans" },
                      ]}
                    />
                    <UILoadingButton
                      size="large"
                      type="button"
                      variant="contained"
                      handleClick={() => onSubmit("sex")}
                      loading={loading && activeField === "sex"}
                    >
                      Save
                    </UILoadingButton>
                  </Box>
                ) : (
                  <Typography>
                    {UppercaseTransform(user.sex as string) || "--"}
                  </Typography>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
