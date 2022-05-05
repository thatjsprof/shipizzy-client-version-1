import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
// import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import styles from "./Account.module.scss";
// import UIInput from "../../../../Components/UI/Input/Input.component";
import UIButton from "../../../../Components/UI/Button/Button.component";
import UIOutlinedInput from "../../../../Components/UI/Input/OutlinedInput.component";

interface AdornmentProps {
  show: boolean;
  text: string;
  handleShowPassword: () => void;
}

const Account = () => {
  const [showFields, setShowFields] = useState<{ [index: string]: boolean }>({
    password: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const setFormState = (value: string) => {
    setShowFields({ ...showFields, [value]: !showFields[value] });
  };

  const breadcrumbs = [
    <Link key="1" to="/settings">
      <span style={{ color: "#000" }}>Settings</span>
    </Link>,
    <Link key="2" to="/settings/account">
      <span style={{ color: "#000" }}>Account</span>
    </Link>,
  ];

  const { password } = showFields;

  const handleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword((prevValue) => !prevValue);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prevValue) => !prevValue);
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
      <Box className={styles.account__section}>
        <Box className={styles.account__section___aside}>
          <Typography variant="h5">Personal Information</Typography>
          <Typography sx={{ color: "#979797", mt: ".5rem" }}>
            Edit your Account settings or update your password
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
              Your email and password grant you access to your account
            </Typography>
            <Typography variant="body2">
              You can update your password whenever necessary
            </Typography>
          </Box>
        </Box>
        <Box className={styles.account__section___main}>
          <Box sx={{ pb: "2rem" }}>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ flexGrow: 1, color: "#979797", pb: ".2rem" }}>
                Password Reset
              </Typography>
              <span
                style={{ color: "#003366", cursor: "pointer" }}
                onClick={() => setFormState("password")}
              >
                {password ? "Close" : "Edit"}
              </span>
            </Box>
            {password ? (
              <Box sx={{ mt: "1rem" }}>
                <UIOutlinedInput
                  label="Old Password"
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
                <UIOutlinedInput
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  variant="outlined"
                  endAdornment={
                    <EndAdornment
                      show={showNewPassword}
                      handleShowPassword={handleShowNewPassword}
                      text="Toggle Password"
                    />
                  }
                ></UIOutlinedInput>
                <UIOutlinedInput
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  endAdornment={
                    <EndAdornment
                      show={showConfirmPassword}
                      handleShowPassword={handleShowConfirmPassword}
                      text="Toggle Password"
                    />
                  }
                ></UIOutlinedInput>
                <UIButton type="button" size="large" variant="contained">
                  Save
                </UIButton>
              </Box>
            ) : (
              <Typography>Last Updated: Never</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Account;
