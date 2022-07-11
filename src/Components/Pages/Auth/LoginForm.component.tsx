import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import { ISignIn } from "Interfaces/Auth";
import { useForm } from "react-hook-form";
import Lf from "Utils/LocalForage/config";
import { AuthSchema } from "../../../Schemas";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import React, { useState, Fragment } from "react";
import { IRequestProps } from "Utils/GraphqlRequest";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import UIInput from "Components/UI/Input/Input.component";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getCurrentAuthenticatedUser } from "Store/UserSlice";
import UIOutlinedInput from "Components/UI/Input/OutlinedInput.component";
import UIButton, { UILoadingButton } from "Components/UI/Button/Button.component";

interface ILoginForm {
  getUser: any;
  loginUser: any;
  loading: boolean;
  makeDecodeToken: any;
  googleLoading: boolean;
  loginGoogleGetUrl: any;
}

const LoginForm = ({
  loading,
  getUser,
  loginUser,
  googleLoading,
  makeDecodeToken,
  loginGoogleGetUrl,
}: ILoginForm) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(AuthSchema.loginValidation),
  });

  const { ref: emailRef, ...emailRest } = register("email");
  const { ref: passwordRef, ...passwordRest } = register("password");

  const decodeToken = async (token: string) => {
    let requestOptionsDecodeToken: IRequestProps = {
      payloadOptions: {
        variables: { token: token },
      },
      requestFunction: makeDecodeToken,
    };

    await getCurrentAuthenticatedUser(getUser, requestOptionsDecodeToken);
  };

  const onSubmit = async (payload: ISignIn) => {
    const data = await loginUser({
      authDetails: payload,
    });

    if (data) {
      const authToken = data.loginUser;
      Lf.setItem<string>("authToken", authToken);
      await decodeToken(authToken);
      toast.success("You have logged in successfully");
      navigate("/dashboard");
    }
  };

  const loginWithGoogle = async () => {
    const data = await loginGoogleGetUrl();

    if (data) {
      window.location.replace(data.loginAuthGenerateUrl);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const EndAdornment = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          edge="end"
          onClick={handleShowPassword}
          onMouseDown={handleShowPassword}
          aria-label="toggle password visibility"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <Box
      noValidate
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box sx={{ p: 2, display: "grid", width: 2 / 4, margin: "0 auto" }}>
        <Typography variant="h5" sx={{ marginBottom: 2.5 }}>
          Welcome Back
        </Typography>

        <UIButton
          type="button"
          styles={{
            width: "100%",
            color: "#000",
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#ddd",
          }}
          handleClick={loginWithGoogle}
        >
          {googleLoading ? (
            <CircularProgress size={24} />
          ) : (
            <Fragment>
              <img
                width="16px"
                style={{
                  marginRight: "1rem",
                }}
                alt="Login with google icon"
                src="https://d3bz3ebxl8svne.cloudfront.net/production/static/svg/icon-google.svg"
              />{" "}
              <span>Login With Google</span>
            </Fragment>
          )}
        </UIButton>

        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            lineHeight: "0.1em",
            margin: "1rem 0 2rem",
            borderBottom: ".1rem solid #ddd",
          }}
        >
          <span style={{ padding: "0 1rem", backgroundColor: "#f6f6f7" }}>
            Or
          </span>
        </Typography>

        <UIInput
          required
          type="email"
          label="Email"
          {...emailRest}
          refs={emailRef}
          error={!!errors.email}
        ></UIInput>

        {errors.email && (
          <span className="v-error">{errors.email.message}</span>
        )}

        <UIOutlinedInput
          required
          label="Password"
          {...passwordRest}
          refs={passwordRef}
          variant="outlined"
          error={!!errors.password}
          endAdornment={<EndAdornment />}
          type={showPassword ? "text" : "password"}
        ></UIOutlinedInput>

        {errors.password && (
          <span className="v-error">{errors.password.message}</span>
        )}

        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Don't Have an Account?
              <Link to="/signup">
                <span style={{ color: "#d58c44" }}> Sign Up here</span>
              </Link>
            </Typography>
          </Box>
          <Typography variant="body1">
            <Link to="/forgot-password">Forgot your password?</Link>
          </Typography>
        </Box>

        <UILoadingButton
          type="submit"
          loading={loading}
          variant="contained"
          styles={{
            padding: "1rem",
            marginTop: "2rem",
          }}
        >
          Sign In
        </UILoadingButton>
      </Box>
    </Box>
  );
};

export default LoginForm;
