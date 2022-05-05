import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import styles from "./Profile.module.scss";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import UIInput from "../../../../Components/UI/Input/Input.component";
import UIModal from "../../../../Components/UI/Modal/Modal.component";
import UISelect from "../../../../Components/UI/Select/Select.component";
import UIButton from "../../../../Components/UI/Button/Button.component";
import UIOutlinedInput from "../../../../Components/UI/Input/OutlinedInput.component";

interface AdornmentProps {
  show: boolean;
  text: string;
  handleShowPassword: () => void;
}

const Profile = () => {
  const [showFields, setShowFields] = useState<{ [index: string]: boolean }>({
    name: false,
    email: false,
    phone: false,
    sex: false,
    dob: false,
  });
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const setFormState = (value: string) => {
    if (value === "email" && !passwordValid) {
      setShowConfirm(true);
    } else {
      setShowFields({ ...showFields, [value]: !showFields[value] });
    }
  };

  const breadcrumbs = [
    <Link key="1" to="/settings">
      <span style={{ color: "#000" }}>Settings</span>
    </Link>,
    <Link key="2" to="/settings/profile">
      <span style={{ color: "#000" }}>Profile</span>
    </Link>,
  ];

  const { name, email, phone, sex, dob } = showFields;

  const handleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const EndAdornment = ({ show, handleShowPassword, text }: AdornmentProps) => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label={text}
          onClick={handleShowPassword}
          onMouseDown={handleShowPassword}
          edge="end"
        >
          {show ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  };

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
      <Box className={styles.profile__section}>
        <Box className={styles.profile__section___aside}>
          <Typography variant="h5">Personal Information</Typography>
          <Typography sx={{ color: "#979797", mt: ".5rem" }}>
            Edit your name, phone number and other personal details
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
              Your name is assigned to all your shipments
            </Typography>
            <Typography variant="body2">
              Your email and phone number would be used to communicate with you
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
                style={{ color: "#003366", cursor: "pointer" }}
                onClick={() => setFormState("name")}
              >
                {name ? "Close" : "Edit"}
              </span>
            </Box>
            {name ? (
              <Box sx={{ mt: "1rem" }}>
                <Box
                  sx={{
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: "repeat(2, 1fr)",
                  }}
                >
                  <UIInput type="text" label="First Name" />
                  <UIInput type="text" label="Last Name" />
                </Box>
                <UIButton type="button" size="large" variant="contained">
                  Save
                </UIButton>
              </Box>
            ) : (
              <Typography>Ajayi David</Typography>
            )}
          </Box>
          <Divider />
          <Box sx={{ py: "2rem" }}>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ flexGrow: 1, color: "#979797", pb: ".2rem" }}>
                Email Address
              </Typography>
              <span
                style={{ color: "#003366", cursor: "pointer" }}
                onClick={() => setFormState("email")}
              >
                {email ? "Close" : "Edit"}
              </span>
            </Box>
            {email ? (
              <Box sx={{ mt: "1rem" }}>
                <UIInput type="text" label="Email Address" />
                <UIButton type="button" size="large" variant="contained">
                  Save
                </UIButton>
              </Box>
            ) : (
              <Typography>david.ajayi.anu@gmail.com</Typography>
            )}
          </Box>
          <Divider />
          <Box sx={{ py: "2rem" }}>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ flexGrow: 1, color: "#979797", pb: ".2rem" }}>
                Phone Number
              </Typography>
              <span
                style={{ color: "#003366", cursor: "pointer" }}
                onClick={() => setFormState("phone")}
              >
                {phone ? "Close" : "Edit"}
              </span>
            </Box>
            {phone ? (
              <Box sx={{ mt: "1rem" }}>
                <UIInput type="number" label="Phone Number" />
                <UIButton type="button" size="large" variant="contained">
                  Save
                </UIButton>
              </Box>
            ) : (
              <Typography>--</Typography>
            )}
          </Box>
          <Divider />
          <Box sx={{ py: "2rem" }}>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ flexGrow: 1, color: "#979797", pb: ".2rem" }}>
                Date of birth
              </Typography>
              <span
                style={{ color: "#003366", cursor: "pointer" }}
                onClick={() => setFormState("dob")}
              >
                {dob ? "Close" : "Edit"}
              </span>
            </Box>
            {dob ? (
              <Box sx={{ mt: "1rem" }}>
                <UIInput type="text" label="Date of Birth" />
                <UIButton type="button" size="large" variant="contained">
                  Save
                </UIButton>
              </Box>
            ) : (
              <Typography>--</Typography>
            )}
          </Box>
          <Divider />
          <Box sx={{ py: "2rem" }}>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ flexGrow: 1, color: "#979797", pb: ".2rem" }}>
                Sex
              </Typography>
              <span
                style={{ color: "#003366", cursor: "pointer" }}
                onClick={() => setFormState("sex")}
              >
                {sex ? "Close" : "Edit"}
              </span>
            </Box>
            {sex ? (
              <Box sx={{ mt: "1rem" }}>
                <UISelect
                  label="Select your Sex"
                  options={[
                    { text: "Male", value: "male" },
                    { text: "Female", value: "female" },
                  ]}
                />
                <UIButton type="button" size="large" variant="contained">
                  Save
                </UIButton>
              </Box>
            ) : (
              <Typography>--</Typography>
            )}
          </Box>
        </Box>
      </Box>
      <UIModal
        title="Kindly confirm your Password to proceed"
        open={showConfirm}
        handleClose={() => setShowConfirm(false)}
      >
        <UIOutlinedInput
          label="Enter your Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          endAdornment={
            <EndAdornment
              show={showPassword}
              handleShowPassword={handleShowPassword}
              text="Toggle Password"
            />
          }
        ></UIOutlinedInput>
        <UIButton
          variant="contained"
          styles={{ width: "100%", marginTop: "1rem", padding: "1rem" }}
          size="large"
          type="button"
          disabled
        >
          Confirm your password
        </UIButton>
      </UIModal>
    </div>
  );
};

export default Profile;
