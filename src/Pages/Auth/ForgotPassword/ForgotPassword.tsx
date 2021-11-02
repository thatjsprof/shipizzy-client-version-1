import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Button from "../../../Components/UI/Button/Button.component";
import UIInput from "../../../Components/UI/Input/Input.component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthSchema } from "../../../Schemas";
import Loader from "../../../Components/Global/Loader/Loader.component";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<auth.IForgotPassword>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(AuthSchema.forgotPasswordValidation),
    defaultValues: {
      email: "",
    },
  });

  const { ref: emailRef, ...emailRest } = register("email");

  const onSubmit = (data: auth.IForgotPassword) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mx: "auto", textAlign: "center", margin: "30px 0px" }}>
        <img src="/Images/Logo/Logo.png" alt="Logo" />
      </Box>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Loader show={loading} text="Resetting your password" />
        <Box sx={{ p: 2, display: "grid", width: 2 / 4, margin: "0 auto" }}>
          <Typography variant="h5" style={{ marginBottom: 25 }}>
            Reset Your Password
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

          <Typography variant="body1" style={{ marginBottom: 20 }}>
            <Link to="/login"> Click here to Login</Link>{" "}
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Button type="submit" variant="contained">
                Reset Password
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default ForgotPasswordPage;
