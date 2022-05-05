import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import UIButton from "../../../../Components/UI/Button/Button.component";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: ".8rem 0rem",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Link to="/">
              <img src="/Images/Logo/Logo1.png" height="30px" alt="Logo" />
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "300px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>About</Typography>
            <Typography>Contact</Typography>
            <Typography>Pricing</Typography>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              Help <KeyboardArrowDownIcon sx={{ marginRight: "10px" }} />
            </Typography>
          </Box>
          <Box>
            <Link to="/login" style={{ marginRight: 25 }}>
              Sign In
            </Link>
            <Link to="/signup">
              <UIButton
                variant="contained"
                styles={{
                  boxShadow: "none",
                  padding: ".5rem 1rem",
                }}
                size="small"
                type="button"
              >
                Create an Account
              </UIButton>
            </Link>
          </Box>
        </Box>
      </Container>
    </nav>
  );
};

export default Navbar;
