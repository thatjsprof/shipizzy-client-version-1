import toast from "react-hot-toast";
import { graphql } from "react-apollo";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthSchema } from "../../../Schemas";
import { flowRight as compose } from "lodash";
import { IForgotPassword } from "Interfaces/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Box, Typography } from "@mui/material";
import Navbar from "../../Landing/components/Navbar/Navbar";
import UIInput from "../../../Components/UI/Input/Input.component";
import UIButton from "../../../Components/UI/Button/Button.component";
import Loader from "../../../Components/Global/Loader/Loader.component";
import { SEND_RESET_TOKEN } from "../../../Graphql/Resolvers/Users/Users.mutationdefs";

const ForgotPasswordPage = ({ sendResetToken }: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassword>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(AuthSchema.forgotPasswordValidation),
    defaultValues: {
      email: "",
    },
  });

  const { ref: emailRef, ...emailRest } = register("email");

  const onSubmit = async (payload: IForgotPassword) => {
    try {
      setLoading(true);
      const { data } = await sendResetToken({
        variables: { email: payload.email },
      });
      toast.success(data.sendResetToken);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error.networkError) toast.error("There is a Server Connection Error");
      error.graphQLErrors.map((error: any) => toast.error(error.message));
    }
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
                  Reset Your Password
                </Typography>
                <Typography style={{ marginBottom: 20 }}>
                  Enter your registered email address below. You will receive a
                  code to create a new password.
                </Typography>
                <UIInput
                  required
                  type="email"
                  {...emailRest}
                  refs={emailRef}
                  label="Email Address"
                  error={!!errors.email}
                ></UIInput>

                {errors.email && (
                  <span className="v-error">{errors.email.message}</span>
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
                  Reset Password
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

export default compose(graphql(SEND_RESET_TOKEN, { name: "sendResetToken" }))(
  ForgotPasswordPage
);
