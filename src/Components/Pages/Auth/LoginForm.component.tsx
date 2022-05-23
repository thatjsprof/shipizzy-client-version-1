import React, { useState, Fragment } from "react";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import {
  LOGIN_USER,
  LOGIN_GOOGLE_GET_URL,
} from "../../../Graphql/Resolvers/Users/Users.mutationdefs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UIButton from "../../UI/Button/Button.component";
import UIInput from "../../UI/Input/Input.component";
import UIOutlinedInput from "../../UI/Input/OutlinedInput.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthSchema } from "../../../Schemas";
import Loader from "../../Global/Loader/Loader.component";
import toast from "react-hot-toast";
import Lf from "../../../Utils/LocalForage/config";

const LoginForm = ({ loginNewUser, loginGoogleGetUrl }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<auth.ISignIn>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(AuthSchema.loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { ref: emailRef, ...emailRest } = register("email");
  const { ref: passwordRef, ...passwordRest } = register("password");

  const onSubmit = async (payload: auth.ISignIn) => {
    try {
      setLoading(true);
      const data = await loginNewUser({
        variables: { authDetails: payload },
      });
      Lf.setItem<string>("authToken", data.data.loginUser);
      toast.success("You have Signed In");
      navigate("/dashboard");
    } catch (err: any) {
      setLoading(false);
      if (err.networkError) toast.error("There is a Server Connection Error");
      err.graphQLErrors.map((error: any) => toast.error(error.message));
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setGoogleLoading(true);
      const link = await loginGoogleGetUrl();
      window.location.replace(link.data.loginAuthGenerateUrl);
    } catch (error: any) {
      setGoogleLoading(false);
      if (error.networkError) toast.error("There is a Server Connection Error");
      error.graphQLErrors.map((error: any) => toast.error(error.message));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const EndAdornment = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleShowPassword}
          onMouseDown={handleShowPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Loader show={loading} text="Logging you in" />
      <Box sx={{ p: 2, display: "grid", width: 2 / 4, margin: "0 auto" }}>
        <Typography variant="h5" sx={{ marginBottom: 2.5 }}>
          Welcome Back
        </Typography>
        <UIButton
          type="button"
          styles={{
            width: "100%",
            backgroundColor: "#ddd",
            color: "#000",
            marginBottom: "1rem",
            padding: "1rem",
          }}
          handleClick={loginWithGoogle}
        >
          {googleLoading ? (
            <CircularProgress size={24} />
          ) : (
            <Fragment>
              <img
                src="https://d3bz3ebxl8svne.cloudfront.net/production/static/svg/icon-google.svg"
                alt="Login with google icon"
                width="16px"
                style={{
                  marginRight: "1rem",
                }}
              />{" "}
              <span>Login With Google</span>
            </Fragment>
          )}
        </UIButton>
        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            borderBottom: ".1rem solid #ddd",
            lineHeight: "0.1em",
            margin: "1rem 0 2rem",
          }}
        >
          <span style={{ padding: "0 1rem", backgroundColor: "#f6f6f7" }}>
            Or
          </span>
        </Typography>
        <UIInput
          label="Email"
          type="email"
          required
          error={!!errors.email}
          refs={emailRef}
          {...emailRest}
        ></UIInput>

        {errors.email && (
          <span className="v-error">{errors.email.message}</span>
        )}

        <UIOutlinedInput
          label="Password"
          type={showPassword ? "text" : "password"}
          required
          error={!!errors.password}
          refs={passwordRef}
          variant="outlined"
          endAdornment={<EndAdornment />}
          {...passwordRest}
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

        <UIButton
          type="submit"
          variant="contained"
          styles={{ marginTop: "2rem", padding: "1rem" }}
        >
          Sign In
        </UIButton>
      </Box>
    </form>
  );
};

export default compose(
  graphql(LOGIN_USER, { name: "loginNewUser" }),
  graphql(LOGIN_GOOGLE_GET_URL, { name: "loginGoogleGetUrl" })
)(LoginForm);
