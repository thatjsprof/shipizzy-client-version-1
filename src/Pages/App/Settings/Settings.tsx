import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import theme from "App/Layout/CustomTheme";
import styles from "./Settings.module.scss";
import { PartialUser } from "Interfaces/Auth";
import Typography from "@mui/material/Typography";
import UICard from "Components/UI/Card/Card.component";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

interface SettingsProp {
  user: PartialUser;
}

const Settings = ({ user }: SettingsProp) => {
  return (
    <div className={styles.settings}>
      <Typography
        sx={{ mb: 1, fontSize: "40px" }}
      >{`${user.firstName} ${user.lastName}`}</Typography>
      <Typography variant="body1">{user.email}</Typography>
      <Box className={styles.settings__section}>
        <div className={styles.settings__cards}>
          <Link to="/settings/profile">
            <UICard
              title={
                <div>
                  <PersonPinIcon
                    sx={{
                      fontSize: "3rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography variant="h6">Personal Information</Typography>
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
                    sx={{
                      fontSize: "3rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography variant="h6">Login & Security</Typography>
                </div>
              }
            >
              <Typography variant="body1">Update your password.</Typography>
            </UICard>
          </Link>
          <Link to="/settings/addresses">
            <UICard
              title={
                <div>
                  <ContactMailIcon
                    sx={{
                      fontSize: "3rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography variant="h6">Address Book</Typography>
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
                    sx={{
                      fontSize: "3rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography variant="h6">Help & Support</Typography>
                </div>
              }
            >
              <Typography variant="body1">Visit our help center.</Typography>
            </UICard>
          </Link>
        </div>
      </Box>
    </div>
  );
};

export default Settings;
