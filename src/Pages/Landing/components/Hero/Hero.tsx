import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import UIButton from "Components/UI/Button/Button.component";
import FilterBAndWIcon from "@mui/icons-material/FilterBAndW";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        marginTop: "100px",
        marginBottom: "7rem",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box>
              <Typography variant="h2" sx={{ fontSize: "40px" }}>
                Powering Global <br /> Agricultural{" "}
                <FilterBAndWIcon sx={{ fontSize: "40px", color: "#003060" }} />{" "}
                <br /> Exports from Africa
              </Typography>
              <Typography sx={{ maxWidth: "500px", mt: 5 }}>
                We Provide you with seamless international shipping fulfillment
                opportunities. Timely delivery of your packages is ensured
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  marginTop: "45px",
                  alignItems: "center",
                }}
              >
                <UIButton
                  type="button"
                  variant="contained"
                  styles={{
                    color: "#fff",
                    borderRadius: "0px",
                    padding: "15px 30px",
                    backgroundColor: "#003060",
                  }}
                >
                  Get Started
                </UIButton>
                <Link
                  to="#"
                  style={{
                    display: "flex",
                    marginLeft: "35px",
                    alignItems: "center",
                  }}
                >
                  Learn More
                  <ArrowForwardIcon sx={{ marginLeft: "10px" }} />
                </Link>
              </Box>
              <Box sx={{ display: "flex", mt: 5, alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ShareLocationIcon sx={{ fontSize: "45px" }} />
                  <Box sx={{ ml: 2 }}>
                    <Typography sx={{ lineHeight: "18px" }}>Track</Typography>
                    <Typography sx={{ lineHeight: "18px" }}>Package</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", ml: 3, alignItems: "center" }}>
                  <ElectricCarIcon sx={{ fontSize: "45px" }} />
                  <Box sx={{ ml: 2 }}>
                    <Typography sx={{ lineHeight: "18px" }}>Fastest</Typography>
                    <Typography sx={{ lineHeight: "18px" }}>Service</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item sx={{ width: "100%" }} xs={6}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderWidth: "5px",
                borderRadius: "30px",
                borderStyle: "solid",
                borderColor: "primary.main",
              }}
              component="img"
              src="/Images/Landing/Hero.jpg"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
