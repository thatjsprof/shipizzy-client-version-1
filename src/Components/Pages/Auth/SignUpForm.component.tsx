import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import { AuthSchema } from "Schemas";
import { useForm } from "react-hook-form";
import { ISignUp } from "Interfaces/Auth";
import Checkbox from "@mui/material/Checkbox";
import { AccountTypes } from "Constants/Auth";
import FormGroup from "@mui/material/FormGroup";
import React, { Fragment, useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import UIInput from "Components/UI/Input/Input.component";
import InputAdornment from "@mui/material/InputAdornment";
import UISelect from "Components/UI/Select/Select.component";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UIOutlinedInput from "Components/UI/Input/OutlinedInput.component";
import UIButton, { UILoadingButton } from "Components/UI/Button/Button.component";

interface ISignUpForm {
  loading: boolean;
  getGoogleUrl: any;
  googleLoading: boolean;
  makeLoginNormalUser: any;
  makeLoginBusinessUser: any;
}

interface AdornmentProps {
  text: string;
  show: boolean;
  handleShowPassword: () => void;
}

const SignUpForm = ({
  loading,
  getGoogleUrl,
  googleLoading,
  makeLoginNormalUser,
  makeLoginBusinessUser,
}: ISignUpForm) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {
    watch,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rcNumber: "",
      agree: false,
      accountType: "",
      businessName: "",
      confirm_password: "",
    },
    reValidateMode: "onChange",
    resolver: yupResolver(AuthSchema.signupValidation),
  });

  const navigate = useNavigate();

  const onSubmit = async (payload: ISignUp) => {
    let data;
    let output = "";
    delete payload.agree;
    delete payload.confirm_password;

    if (payload.accountType === "individual") {
      delete payload.rcNumber;
      delete payload.businessName;

      data = await makeLoginNormalUser({
        authDetails: payload,
      });

      output = "addUser";
    } else {
      data = await makeLoginBusinessUser({ userDetails: payload });

      output = "addUserBusiness";
    }

    console.log(data[output]);

    if (data) {
      toast.success(
        "Your Account has been Created. Please verify your account."
      );
      navigate("/login");
    }
  };

  const handleGoogleSignUp = async () => {
    const data = await getGoogleUrl();

    if (data) {
      window.location.replace(data.loginAuthGenerateUrl);
    }
  };

  const { ref: businessNameRef, ...businessNameRest } =
    register("businessName");
  const { ref: nameRef, ...nameRest } = register("name");
  const { ref: emailRef, ...emailRest } = register("email");
  const { ref: agreeRef, ...agreeRest } = register("agree");
  const { ref: confirmPasswordRef, ...confirmPasswordRest } =
    register("confirm_password");
  const { ref: rcNumberRef, ...rcNumberRest } = register("rcNumber");
  const { ref: passwordRef, ...passwordRest } = register("password");
  const { ref: accountTypeRef, ...accountTypeRest } = register("accountType");

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

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 2, display: "grid", width: 2 / 4, margin: "0 auto" }}>
        <Typography variant="h5" sx={{ marginBottom: 2.5 }}>
          Sign Up to create your account
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
          handleClick={handleGoogleSignUp}
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
                alt="Signup with google icon"
                src="https://d3bz3ebxl8svne.cloudfront.net/production/static/svg/icon-google.svg"
              />{" "}
              Sign Up With Google
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
          type="name"
          label="Name"
          {...nameRest}
          refs={nameRef}
          error={!!errors.name}
        ></UIInput>

        {errors.name && <span className="v-error">{errors.name.message}</span>}

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

        <UISelect
          required
          emptyValue
          label="Account Type"
          {...accountTypeRest}
          refs={accountTypeRef}
          options={AccountTypes}
          error={!!errors.accountType}
          value={watch("accountType")}
        ></UISelect>

        {errors.accountType && (
          <span className="v-error">{errors.accountType.message}</span>
        )}

        {getValues("accountType") === "business" ? (
          <Fragment>
            <UIInput
              required
              type="text"
              label="Business Name"
              {...businessNameRest}
              refs={businessNameRef}
              error={!!errors.businessName}
            ></UIInput>

            {errors.businessName && (
              <span className="v-error">{errors.businessName.message}</span>
            )}

            <UIInput
              required
              type="text"
              {...rcNumberRest}
              label="RC Number"
              refs={rcNumberRef}
              error={!!errors.rcNumber}
            ></UIInput>

            {errors.rcNumber && (
              <span className="v-error">{errors.rcNumber.message}</span>
            )}
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}

        <UIOutlinedInput
          required
          label="Password"
          {...passwordRest}
          refs={passwordRef}
          variant="outlined"
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
          required
          variant="outlined"
          label="Confirm Password"
          {...confirmPasswordRest}
          refs={confirmPasswordRef}
          error={!!errors.confirm_password}
          type={showConfirmPassword ? "text" : "password"}
          endAdornment={
            <EndAdornment
              show={showConfirmPassword}
              text="Toggle Confirm Password"
              handleShowPassword={handleShowConfirmPassword}
            />
          }
        ></UIOutlinedInput>

        {errors.confirm_password && (
          <span className="v-error">{errors.confirm_password.message}</span>
        )}

        <FormGroup sx={{ mb: "1rem" }}>
          <FormControlLabel
            control={
              <Checkbox
                disableRipple
                defaultChecked
                {...agreeRest}
                inputRef={agreeRef}
              />
            }
            sx={{ mb: "-.5rem" }}
            label={
              <span>
                I agree to Shipizzy's{" "}
                <span style={{ color: "#d58c44" }}>Terms</span> and{" "}
                <span style={{ color: "#d58c44" }}>Privacy Policy</span>
              </span>
            }
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

        <UILoadingButton
          type="submit"
          loading={loading}
          variant="contained"
          styles={{
            padding: "1rem",
            marginTop: "2rem",
          }}
        >
          Sign Up
        </UILoadingButton>
      </Box>
    </form>
  );
};

export default SignUpForm;
