import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LoginFormContainer from "Components/Pages/Auth/LoginForm.container";

const LoginPage = () => {
  return (
    <Box
      sx={{
        gap: 1,
        display: "grid",
        height: "100vh",
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "#d99959",
        }}
      >
        <div
          style={{
            top: "0",
            left: "0",
            opacity: ".5",
            width: "100%",
            minHeight: "100%",
            position: "absolute",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/Images/Login/bg-auth-layout.svg)",
          }}
        ></div>
        <img
          alt="Signup page background"
          style={{ position: "absolute", bottom: 0, left: 0, width: "70%" }}
          src="https://d3bz3ebxl8svne.cloudfront.net/production/static/svg/bg/bg-auth-signin.svg"
        />
        <Typography
          variant="h3"
          sx={{
            top: "30%",
            left: "50%",
            color: "#fff",
            position: "absolute",
            transform: "translate(-50%, -30%)",
          }}
        >
          Experience timely,
          <br /> affordable and,
          <br /> transparent shipping
        </Typography>
      </div>
      <div style={{ margin: "auto 0rem" }}>
        <Box
          sx={{
            mx: "auto",
            margin: "30px 0px",
            textAlign: "center",
          }}
        >
          <Link to="/">
            <img
              alt="Logo"
              src="/Images/Logo/Logo.png"
              style={{ backgroundSize: "auto" }}
            />
          </Link>
        </Box>
        <LoginFormContainer />
      </div>
    </Box>
  );
};

export default LoginPage;
