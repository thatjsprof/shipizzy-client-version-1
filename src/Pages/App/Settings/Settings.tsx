import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import UICard from "../../../Components/UI/Card/Card.component";
import styles from "./Settings.module.scss";
import theme from "../../../App/Layout/CustomTheme";

const Settings = () => {
  return (
    <div className={styles.settings}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Ajayi David
      </Typography>
      <Typography variant="body1">david.ajayi.anu@gmail.com</Typography>
      <Box className={styles.settings__section}>
        <div className={styles.settings__cards}>
          <Link to="/settings/profile">
            <UICard
              title={
                <div>
                  <PersonPinIcon
                    sx={{ fontSize: "3rem", color: theme.palette.primary.main }}
                  />
                  <Typography variant="h5">Personal Information</Typography>
                </div>
              }
            >
              <Typography variant="body1">
                Edit your general information.
              </Typography>
            </UICard>
          </Link>
          <Link to="/settings/account">
            <UICard
              title={
                <div>
                  <LockOpenIcon
                    sx={{ fontSize: "3rem", color: theme.palette.primary.main }}
                  />
                  <Typography variant="h5">Login & Security</Typography>
                </div>
              }
            >
              <Typography variant="body1">
                Update your password. Keep your account safe.
              </Typography>
            </UICard>
          </Link>
          <Link to="/settings/addresses">
            <UICard
              title={
                <div>
                  <ContactMailIcon
                    sx={{ fontSize: "3rem", color: theme.palette.primary.main }}
                  />
                  <Typography variant="h5">Address Book</Typography>
                </div>
              }
            >
              <Typography variant="body1">
                Edit, delete and add new addresses.
              </Typography>
            </UICard>
          </Link>
        </div>
        <div className={styles.settings__cards}>
          <Link to="/settings/help">
            <UICard
              title={
                <div>
                  <ContactSupportIcon
                    sx={{ fontSize: "3rem", color: theme.palette.primary.main }}
                  />
                  <Typography variant="h5">Help & Support</Typography>
                </div>
              }
            >
              <Typography variant="body1">
                Visit our help center. We are always happy to help.
              </Typography>
            </UICard>
          </Link>
        </div>
      </Box>
    </div>
  );
};

export default Settings;
