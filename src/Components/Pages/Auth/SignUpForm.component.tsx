import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import UIInput from "../../UI/Input/Input.component";
import UISelect from "../../UI/Select/Select.component";
import UIButton from "../../UI/Button/Button.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthSchema } from "../../../Schemas";
import Loader from "../../Global/Loader/Loader.component";
import theme from "../../../App/Layout/CustomTheme";

const AccountTypes: auth.AccountType[] = [
  {
    value: "Individual",
    text: "Individual Account",
  },
  {
    value: "Business",
    text: "Business Account",
  },
];

const SignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<auth.ISignUp>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(AuthSchema.signupValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (data: auth.ISignUp) => {
    setLoading(true);
    console.log(data);
  };

  const { ref: nameRef, ...nameRest } = register("name");
  const { ref: emailRef, ...emailRest } = register("email");
  const { ref: passwordRef, ...passwordRest } = register("password");
  const { ref: confirmPasswordRef, ...confirmPasswordRest } =
    register("confirm_password");

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Loader show={loading} text="Signing you up" />
      <Box sx={{ p: 2, display: "grid", width: 2 / 4, margin: "0 auto" }}>
        <Typography variant="h5" sx={{ marginBottom: 2.5 }}>
          SignUp to create your account
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
            alt="Signup with google icon"
            width="16px"
            style={{
              marginRight: "1rem",
            }}
          />{" "}
          SignUp With Google
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
          label="Name"
          type="name"
          required
          error={!!errors.name}
          refs={nameRef}
          {...nameRest}
        ></UIInput>

        {errors.name && <span className="v-error">{errors.name.message}</span>}

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

        <UISelect
          label="Account Type"
          options={AccountTypes}
          emptyValue
          required
        ></UISelect>

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

        <UIInput
          label="Confirm Password"
          type="password"
          required
          error={!!errors.confirm_password}
          refs={confirmPasswordRef}
          {...confirmPasswordRest}
        ></UIInput>

        {errors.confirm_password && (
          <span className="v-error">{errors.confirm_password.message}</span>
        )}

        <FormGroup sx={{ mb: "1rem" }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={
              <span>
                I agree to Shipizzy's{" "}
                <span style={{ color: theme.palette.primary.main }}>Terms</span>{" "}
                and{" "}
                <span style={{ color: theme.palette.primary.main }}>
                  Privacy Policy
                </span>
              </span>
            }
            sx={{ mb: "-.5rem" }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label={<span>Send me Shipizzy updates occasionally</span>}
          />
        </FormGroup>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1">
              Have an Account?
              <Link to="/login"> Sign In here</Link>{" "}
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
          Sign Up
        </UIButton>
      </Box>
    </form>
  );
};

export default SignUpForm;
