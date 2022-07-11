import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import UISelect from "../../../../Components/UI/Select/Select.component";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="lg">
        <Grid
          sx={{
            "& .MuiListItemText-root:hover": {
              transition: ".3s",
              color: "primary.main",
            },
          }}
          container
          spacing={3}
        >
          <Grid item xs={4}>
            <Link to="/">
              <img
                alt="Logo"
                height="30px"
                src="/Images/Logo/Logo.png"
                style={{ marginLeft: "-9px" }}
              />
            </Link>
            <Typography sx={{ mt: "10px" }}>
              Experience affordable, timely and transparent shipping from
              Nigeria to any country worldwide
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography sx={{ fontWeight: "600" }} variant="subtitle1">
              Solutions
            </Typography>
            <List>
              <ListItem disableGutters>
                <Link to="/">
                  <ListItemText primary="Individual" />
                </Link>
              </ListItem>
              <ListItem disableGutters>
                <Link to="/">
                  <ListItemText primary="Business" />
                </Link>
              </ListItem>
              <ListItem disableGutters>
                <Link to="/">
                  <ListItemText primary="Industry" />
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Resources
            </Typography>
            <List>
              <ListItem disableGutters>
                <Link to="/">
                  <ListItemText primary="Help Center" />
                </Link>
              </ListItem>
              <ListItem disableGutters>
                <Link to="/">
                  <ListItemText primary="Blog" />
                </Link>
              </ListItem>
              <ListItem disableGutters>
                <Link to="/">
                  <ListItemText primary="Pricing" />
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Company
            </Typography>
            <List>
              <ListItem disableGutters>
                <Link to="/">
                  <ListItemText primary="About Us" />
                </Link>
              </ListItem>
              <ListItem disableGutters>
                <Link to="/">
                  <ListItemText primary="Contact Us" />
                </Link>
              </ListItem>
              <ListItem disableGutters>
                <Link to="/">
                  <ListItemText primary="FAQ" />
                </Link>
              </ListItem>
              <ListItem disableGutters>
                <Link to="/">
                  <ListItemText primary="Terms and Conditions" />
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", pt: "3rem", pb: "2rem" }}>
          <Box
            sx={{
              flexGrow: 1,
              "& .MuiSvgIcon-root": {
                color: "#003060",
                padding: ".5rem",
                transition: ".4s",
                cursor: "pointer",
                "&:hover": {
                  padding: ".5rem",
                  borderRadius: "50%",
                  transform: "rotate(30deg)",
                  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                },
                "&:not(:last-child)": {
                  mr: "3rem",
                },
              },
            }}
          >
            <LinkedInIcon
              sx={{
                "&:hover": {
                  color: "#0A66C2",
                },
              }}
            />
            <FacebookIcon
              sx={{
                "&:hover": {
                  color: "#1877F2",
                },
              }}
            />
            <TwitterIcon
              sx={{
                "&:hover": {
                  color: "#1DA1F2",
                },
              }}
            />
            <YouTubeIcon
              sx={{
                "&:hover": {
                  color: "#CD201F",
                },
              }}
            />
            <InstagramIcon
              sx={{
                "&:hover": {
                  color: "#E4405F",
                },
              }}
            />
          </Box>
          <Box>
            <Typography>
              Choose a currency:{" "}
              <UISelect
                size="small"
                defaultValue="ngn"
                emptyValue={false}
                style={{
                  border: "0px",
                  display: "inline",
                  marginLeft: "10px",
                  verticalAlign: "middle",
                }}
                options={[
                  { text: "USD", value: "usd" },
                  { text: "NGN", value: "ngn" },
                ]}
              ></UISelect>
            </Typography>
          </Box>
        </Box>
      </Container>
      <Divider></Divider>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", py: "2.5rem" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography>© Shipizzy - All rights reserved</Typography>
          </Box>
          <Box>
            <Link style={{ marginRight: "1.5rem" }} to="/">
              Terms of Service
            </Link>
            <Link to="/">Privacy Policy</Link>
          </Box>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
