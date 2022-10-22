import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import { AuthSchema } from "Schemas";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import styles from "./Account.module.scss";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { IResetPayload } from "./Account.container";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import { IChangePassword, IUser } from "Interfaces/Auth";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { UILoadingButton } from "Components/UI/Button/Button.component";
import UIOutlinedInput from "Components/UI/Input/OutlinedInput.component";

interface AdornmentProps {
  text: string;
  show: boolean;
  handleShowPassword: () => void;
}

interface IAccountProps {
  user: IUser;
  loading: boolean;
  sendResetPassword: (payload: IResetPayload) => Promise<any>;
}

const Account = ({ sendResetPassword, loading, user }: IAccountProps) => {
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

  const closeFormState = (value: string) => {
    setShowFields({ ...showFields, [value]: false });
  };

  const closePasswordIcons = () => {
    setShowPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const breadcrumbs = [
    <Link key="1" to="/settings">
      <span style={{ color: "#000" }}>Settings</span>
    </Link>,
    <Link key="2" to="/settings/account">
      <span style={{ color: "#000" }}>Account</span>
    </Link>,
  ];

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePassword>({
    mode: "onBlur",
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    reValidateMode: "onBlur",
    resolver: yupResolver(AuthSchema.changePasswordValidation),
  });

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

  const onSubmit = async (payload: IChangePassword) => {
    const data = await sendResetPassword({
      type: "change",
      id: user.id as string,
      password: payload.password,
      newPassword: payload.newPassword,
      confirmPassword: payload.confirmPassword,
    });

    if (data) {
      reset();
      closePasswordIcons();
      closeFormState("password");
      toast.success(data.sendResetPassword);
    }
  };

  const EndAdornment = ({ show, handleShowPassword, text }: AdornmentProps) => {
    return (
      <InputAdornment position="end">
        <IconButton
          edge="end"
          aria-label={text}
          onClick={handleShowPassword}
          onMouseDown={handleShowPassword}
        >
          {show ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  };

  const { ref: passwordRef, ...passwordRest } = register("password");
  const { ref: newPasswordRef, ...newPasswordRest } = register("newPassword");
  const { ref: confirmPasswordRef, ...confirmPasswordRest } =
    register("confirmPassword");

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
          <Typography
            sx={{
              mt: ".5rem",
              color: "#979797",
            }}
          >
            Edit your Account settings or update your password
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
              <Typography
                sx={{
                  pb: ".2rem",
                  flexGrow: 1,
                  color: "#979797",
                }}
              >
                Password Reset
              </Typography>
              <span
                style={{
                  color: "#003366",
                  cursor: "pointer",
                }}
                onClick={() => setFormState("password")}
              >
                {password ? "Close" : "Edit"}
              </span>
            </Box>
            {password ? (
              <Box
                noValidate
                component="form"
                autoComplete="off"
                sx={{ mt: "1rem" }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <UIOutlinedInput
                  {...passwordRest}
                  variant="outlined"
                  refs={passwordRef}
                  label="Old Password"
                  error={!!errors.password}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <EndAdornment
                      show={showPassword}
                      text="Toggle Password"
                      handleShowPassword={handleShowPassword}
                    />
                  }
                ></UIOutlinedInput>
                {errors.password && (
                  <span className="v-error">{errors.password.message}</span>
                )}
                <UIOutlinedInput
                  variant="outlined"
                  {...newPasswordRest}
                  label="New Password"
                  refs={newPasswordRef}
                  error={!!errors.newPassword}
                  type={showNewPassword ? "text" : "password"}
                  endAdornment={
                    <EndAdornment
                      show={showNewPassword}
                      text="Toggle Password"
                      handleShowPassword={handleShowNewPassword}
                    />
                  }
                ></UIOutlinedInput>
                {errors.newPassword && (
                  <span className="v-error">{errors.newPassword.message}</span>
                )}
                <UIOutlinedInput
                  variant="outlined"
                  {...confirmPasswordRest}
                  label="Confirm Password"
                  refs={confirmPasswordRef}
                  error={!!errors.confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <EndAdornment
                      text="Toggle Password"
                      show={showConfirmPassword}
                      handleShowPassword={handleShowConfirmPassword}
                    />
                  }
                ></UIOutlinedInput>
                {errors.confirmPassword && (
                  <span className="v-error">
                    {errors.confirmPassword.message}
                  </span>
                )}
                <UILoadingButton
                  size="large"
                  type="submit"
                  loading={loading}
                  variant="contained"
                >
                  Save
                </UILoadingButton>
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
