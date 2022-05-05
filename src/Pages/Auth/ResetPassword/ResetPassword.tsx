import toast from "react-hot-toast";
import { graphql } from "react-apollo";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthSchema } from "../../../Schemas";
import { flowRight as compose } from "lodash";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import { Container, Box, Typography } from "@mui/material";
import Navbar from "../../Landing/components/Navbar/Navbar";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UIButton from "../../../Components/UI/Button/Button.component";
import Loader from "../../../Components/Global/Loader/Loader.component";
import UIOutlinedInput from "../../../Components/UI/Input/OutlinedInput.component";
import { SEND_RESET_PASSWORD } from "../../../Graphql/Resolvers/Users/Users.mutationdefs";

interface AdornmentProps {
  show: boolean;
  text: string;
  handleShowPassword: () => void;
}

const ResetPasswordPage = ({ sendResetPassword }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<auth.IResetPassword>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(AuthSchema.resetPasswordValidation),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const { ref: passwordRef, ...passwordRest } = register("password");
  const { ref: newPasswordRef, ...newPasswordRest } = register("newPassword");

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const onSubmit = async (payload: auth.IResetPassword) => {
    if (!token) {
      toast.error("Token supplied is invalid");
    } else {
      try {
        setLoading(true);
        const { data } = await sendResetPassword({
          variables: {
            token: token,
            password: payload.password,
            newPassword: payload.newPassword,
          },
        });
        toast.success(data.sendResetPassword);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (error.networkError)
          toast.error("There is a Server Connection Error");
        error.graphQLErrors.map((error: any) => toast.error(error.message));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
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
    <Box>
      <Navbar />

      <Container maxWidth="md">
        <Box
          sx={{
            display: "grid",
            height: "100vh",
          }}
        >
          <div style={{ margin: "auto 0rem" }}>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Loader show={loading} text="Resetting your password" />
              <Box
                sx={{
                  width: 2.4 / 4,
                  display: "grid",
                  margin: "-5rem auto 0 auto",
                }}
              >
                <Typography variant="h5" style={{ marginBottom: 20 }}>
                  Retrieve access to your account
                </Typography>
                <Typography style={{ marginBottom: 20 }}>
                  Enter your previous password and new password to proceed.
                </Typography>
                <UIOutlinedInput
                  required
                  {...passwordRest}
                  variant="outlined"
                  refs={passwordRef}
                  label="Old Password"
                  error={!!errors.password}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <EndAdornment
                      show={showPassword}
                      handleShowPassword={handleShowPassword}
                      text="Toggle Password"
                    />
                  }
                ></UIOutlinedInput>

                {errors.password && (
                  <span className="v-error">{errors.password.message}</span>
                )}

                <UIOutlinedInput
                  required
                  variant="outlined"
                  label="New Password"
                  {...newPasswordRest}
                  refs={newPasswordRef}
                  error={!!errors.newPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <EndAdornment
                      show={showConfirmPassword}
                      handleShowPassword={handleShowConfirmPassword}
                      text="Toggle Confirm Password"
                    />
                  }
                ></UIOutlinedInput>

                {errors.newPassword && (
                  <span className="v-error">{errors.newPassword.message}</span>
                )}

                <UIButton
                  styles={{
                    padding: "1rem",
                    marginTop: "1rem",
                    marginBottom: "1.5rem",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Change Password
                </UIButton>
                <Typography variant="body1" style={{ marginBottom: 10 }}>
                  Remember your Password?
                  <Link to="/login">
                    <span style={{ color: "#d58c44" }}> Sign In</span>
                  </Link>
                </Typography>
                <Typography variant="body1" style={{ marginBottom: 20 }}>
                  Need Help?
                  <Link to="/login">
                    <span style={{ color: "#d58c44" }}>
                      {" "}
                      Visit our Support Page
                    </span>
                  </Link>{" "}
                </Typography>
              </Box>
            </form>
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default compose(
  graphql(SEND_RESET_PASSWORD, { name: "sendResetPassword" })
)(ResetPasswordPage);
