import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SignUpForm from "../../../Components/Pages/Auth/SignUpForm.component";

const SignUpPage = () => {
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
            opacity: ".1",
            position: "absolute",
            top: "0",
            left: "0",
            minHeight: "100%",
            width: "100%",
            backgroundImage: "url(/Images/Signup/Signup-img-3.svg)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <Box
          sx={{
            color: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "100%",
            textAlign: "center",
          }}
        >
          <img
            src="https://d3bz3ebxl8svne.cloudfront.net/production/static/svg/bg/bg-auth-box.svg"
            alt="Login page background"
          />
          <Typography variant="h3">Go Global with Shipizzy</Typography>
          <Typography variant="h6">
            Experience timely, affordable and, transparent shipping
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            color: "#fff",
            bottom: "1rem",
            left: "50%",
            transform: "translate(-50%)",
          }}
        >
          &copy; Shipizzy Company Limited
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
        <SignUpForm />
      </div>
    </Box>
  );
};

export default SignUpPage;
