import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import SignUpForm from "../../../Components/Pages/Auth/SignUpForm.component";

const SignUpPage = () => {
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
            opacity: ".1",
            width: "100%",
            minHeight: "100%",
            position: "absolute",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/Images/Signup/Signup-img-3.svg)",
          }}
        ></div>
        <Box
          sx={{
            top: "50%",
            left: "50%",
            color: "#fff",
            minWidth: "100%",
            textAlign: "center",
            position: "absolute",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            alt="Login page background"
            src="https://d3bz3ebxl8svne.cloudfront.net/production/static/svg/bg/bg-auth-box.svg"
          />
          <Typography variant="h3">Go Global with Shipizzy</Typography>
          <Typography variant="h6">
            Experience timely, affordable and, transparent shipping
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            left: "50%",
            color: "#fff",
            bottom: "1rem",
            position: "absolute",
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
            overflow: "hidden",
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
        <SignUpForm />
        <br />
      </div>
    </Box>
  );
};

export default SignUpPage;
