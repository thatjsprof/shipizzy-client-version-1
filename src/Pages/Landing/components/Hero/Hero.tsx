import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import UIButton from "../../../../Components/UI/Button/Button.component";

const Hero = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "700px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Backdrop open={true} sx={{ position: "absolute" }} />
      <Box
        alt="Hero"
        component="img"
        src="/Images/Landing/Hero.jpg"
        sx={{
          width: "100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Box
        sx={{
          top: "10%",
          width: "100%",
          color: "#fff",
          position: "absolute",
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ fontSize: "35px" }}>
            Timely and affordable shipping
            <br />
            from Nigeria to anywhere in the world
          </Typography>
          <Typography variant="body1" sx={{ mt: 5 }}>
            Easy package tracking, no Customs duties.
            <br /> We offer timely and stress-free shipping solutions from
            <br /> the USA to Nigeria.
          </Typography>
          <Link to="/login">
            <UIButton
              size="large"
              type="button"
              variant="contained"
              styles={{
                boxShadow: "none",
                marginTop: "50px",
                padding: ".5rem 1rem",
              }}
            >
              Log In
            </UIButton>
          </Link>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;
