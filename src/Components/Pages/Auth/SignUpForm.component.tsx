import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UIInput from "../../UI/Input/Input.component";
import UIOutlinedInput from "../../UI/Input/OutlinedInput.component";
import UISelect from "../../UI/Select/Select.component";
import UIButton from "../../UI/Button/Button.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthSchema } from "../../../Schemas";
import Loader from "../../Global/Loader/Loader.component";
import {
  LOGIN_GOOGLE_GET_URL,
  SIGN_UP_USER,
  SIGN_UP_BUSINESS_USER,
} from "../../../Graphql/Resolvers/Users/Users.mutationdefs";
import toast from "react-hot-toast";

const AccountTypes: auth.AccountType[] = [
  {
    value: "individual",
    text: "Individual Account",
  },
  {
    value: "business",
    text: "Business Account",
  },
];

interface AdornmentProps {
  show: boolean;
  text: string;
  handleShowPassword: () => void;
}

const SignUpForm = ({
  getGoogleUrl,
  signUpNormalUser,
  signUpBusinessUser,
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {
    watch,
    register,
    getValues,
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
      accountType: "",
      businessName: "",
      rcNumber: "",
      agree: false,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (payload: auth.ISignUp) => {
    try {
      setLoading(true);
      let data;
      let output = "";
      delete payload.confirm_password;
      delete payload.agree;
      if (payload.accountType === "individual") {
        delete payload.businessName;
        delete payload.rcNumber;
        data = await signUpNormalUser({
          variables: { userDetails: payload },
        });
        output = "addUser";
      } else {
        data = await signUpBusinessUser({
          variables: { userDetails: payload },
        });
        output = "addUserBusiness";
      }
      console.log(data.data[output]);
      toast.success(
        "Your Account has been Created. Please verify your account."
      );
      navigate("/login");
    } catch (err: any) {
      setLoading(false);
      if (err.networkError) toast.error("There is a Server Connection Error");
      err.graphQLErrors.map((error: any) => toast.error(error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true);
      const link = await getGoogleUrl();
      window.location.replace(link.data.loginAuthGenerateUrl);
    } catch (error: any) {
      setGoogleLoading(false);
      if (error.networkError) toast.error("There is a Server Connection Error");
      error.graphQLErrors.map((error: any) => toast.error(error.message));
    } finally {
      setGoogleLoading(false);
    }
  };

  const { ref: nameRef, ...nameRest } = register("name");
  const { ref: emailRef, ...emailRest } = register("email");
  const { ref: accountTypeRef, ...accountTypeRest } = register("accountType");
  const { ref: businessNameRef, ...businessNameRest } =
    register("businessName");
  const { ref: rcNumberRef, ...rcNumberRest } = register("rcNumber");
  const { ref: passwordRef, ...passwordRest } = register("password");
  const { ref: confirmPasswordRef, ...confirmPasswordRest } =
    register("confirm_password");
  const { ref: agreeRef, ...agreeRest } = register("agree");

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
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Loader show={loading} text="Signing you up" />
      <Box sx={{ p: 2, display: "grid", width: 2 / 4, margin: "0 auto" }}>
        <Typography variant="h5" sx={{ marginBottom: 2.5 }}>
          Sign Up to create your account
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
          handleClick={handleGoogleSignUp}
        >
          {googleLoading ? (
            <CircularProgress size={24} />
          ) : (
            <Fragment>
              <img
                src="https://d3bz3ebxl8svne.cloudfront.net/production/static/svg/icon-google.svg"
                alt="Signup with google icon"
                width="16px"
                style={{
                  marginRight: "1rem",
                }}
              />{" "}
              Sign Up With Google
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
          error={!!errors.accountType}
          value={watch("accountType")}
          refs={accountTypeRef}
          {...accountTypeRest}
        ></UISelect>

        {errors.accountType && (
          <span className="v-error">{errors.accountType.message}</span>
        )}

        {getValues("accountType") === "business" ? (
          <Fragment>
            <UIInput
              label="Business Name"
              type="text"
              required
              error={!!errors.businessName}
              refs={businessNameRef}
              {...businessNameRest}
            ></UIInput>

            {errors.businessName && (
              <span className="v-error">{errors.businessName.message}</span>
            )}

            <UIInput
              label="RC Number"
              type="text"
              required
              error={!!errors.rcNumber}
              refs={rcNumberRef}
              {...rcNumberRest}
            ></UIInput>

            {errors.rcNumber && (
              <span className="v-error">{errors.rcNumber.message}</span>
            )}
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}

        <UIOutlinedInput
          label="Password"
          type={showPassword ? "text" : "password"}
          required
          error={!!errors.password}
          refs={passwordRef}
          variant="outlined"
          endAdornment={
            <EndAdornment
              show={showPassword}
              handleShowPassword={handleShowPassword}
              text="Toggle Password"
            />
          }
          {...passwordRest}
        ></UIOutlinedInput>

        {errors.password && (
          <span className="v-error">{errors.password.message}</span>
        )}

        <UIOutlinedInput
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          required
          error={!!errors.confirm_password}
          refs={confirmPasswordRef}
          variant="outlined"
          endAdornment={
            <EndAdornment
              show={showConfirmPassword}
              handleShowPassword={handleShowConfirmPassword}
              text="Toggle Confirm Password"
            />
          }
          {...confirmPasswordRest}
        ></UIOutlinedInput>

        {errors.confirm_password && (
          <span className="v-error">{errors.confirm_password.message}</span>
        )}

        <FormGroup sx={{ mb: "1rem" }}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                disableRipple
                inputRef={agreeRef}
                {...agreeRest}
              />
            }
            label={
              <span>
                I agree to Shipizzy's{" "}
                <span style={{ color: "#d58c44" }}>Terms</span> and{" "}
                <span style={{ color: "#d58c44" }}>Privacy Policy</span>
              </span>
            }
            sx={{ mb: "-.5rem" }}
          />

          {errors.agree && (
            <span className="v-error" style={{ marginTop: "10px" }}>
              {errors.agree.message}
            </span>
          )}

          <FormControlLabel
            control={<Checkbox />}
            label={<span>Send me Shipizzy updates occasionally</span>}
          />
        </FormGroup>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1">
              Have an Account?
              <Link to="/login">
                {" "}
                <span style={{ color: "#d58c44" }}>Sign In here</span>
              </Link>{" "}
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

export default compose(
  graphql(LOGIN_GOOGLE_GET_URL, { name: "getGoogleUrl" }),
  graphql(SIGN_UP_USER, { name: "signUpNormalUser" }),
  graphql(SIGN_UP_BUSINESS_USER, { name: "signUpBusinessUser" })
)(SignUpForm);
