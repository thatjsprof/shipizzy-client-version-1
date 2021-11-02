import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoginForm from "../../../Components/Pages/Auth/LoginForm.component";

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 1,
        gridTemplateColumns: "repeat(2, 1fr)",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#d99959",
          position: "relative",
        }}
      >
        <div
          style={{
            opacity: ".5",
            position: "absolute",
            top: "0",
            left: "0",
            minHeight: "100%",
            width: "100%",
            backgroundImage: "url(/Images/Login/bg-auth-layout.svg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <img
          src="https://d3bz3ebxl8svne.cloudfront.net/production/static/svg/bg/bg-auth-signin.svg"
          alt="Signup page background"
          style={{ position: "absolute", bottom: 0, left: 0, width: "70%" }}
        />
        <Typography
          variant="h3"
          sx={{
            color: "#fff",
            position: "absolute",
            top: "30%",
            left: "50%",
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
            textAlign: "center",
            margin: "30px 0px",
          }}
        >
          <img
            src="/Images/Logo/Logo.png"
            alt="Logo"
            style={{ backgroundSize: "auto" }}
          />
        </Box>
        <LoginForm />
      </div>
    </Box>
  );
};

export default LoginPage;
