import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UIButton from "../../UI/Button/Button.component";
import UIInput from "../../UI/Input/Input.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthSchema } from "../../../Schemas";
import Loader from "../../Global/Loader/Loader.component";

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

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

  const onSubmit = (data: auth.ISignIn) => {
    setLoading(true);
    setTimeout(() => {
      history.push("/dashboard");
      setLoading(false);
    }, 2000);
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
        >
          <img
            src="https://d3bz3ebxl8svne.cloudfront.net/production/static/svg/icon-google.svg"
            alt="Login with google icon"
            width="16px"
            style={{
              marginRight: "1rem",
            }}
          />{" "}
          Login With Google
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

        <UIInput
          label="Password"
          type="password"
          required
          error={!!errors.password}
          refs={passwordRef}
          {...passwordRest}
        ></UIInput>

        {errors.password && (
          <span className="v-error">{errors.password.message}</span>
        )}

        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Don't Have an Account?
              <Link to="/signup"> Sign Up here</Link>{" "}
            </Typography>
          </Box>
          <Typography variant="body1">
            <Link to="/forgot-password">Forgot your password?</Link>{" "}
          </Typography>
        </Box>

        <UIButton
          styles={{ marginTop: "2rem", padding: "1rem" }}
          type="submit"
          variant="contained"
        >
          Sign In
        </UIButton>
      </Box>
    </form>
  );
};

export default LoginForm;
