import List from "@mui/material/List";
import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import Collapse from "@mui/material/Collapse";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SavingsIcon from "@mui/icons-material/Savings";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import SettingsIcon from "@mui/icons-material/Settings";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const NormalLinks: LinksType = [
  { icon: "DashboardIcon", name: "Dashboard", active: true, url: "/dashboard" },
  {
    icon: "AccountBalanceWalletIcon",
    name: "Wallet",
    active: false,
    url: "/wallet",
  },
  {
    icon: "SavingsIcon",
    name: "Investments",
    active: false,
    url: "/investments",
  },
];

const ExportLinks: LinksType = [
  {
    icon: "ShoppingBasketIcon",
    name: "Your Fulfillments",
    url: "/fulfillments",
  },
  { icon: "ReceiptIcon", name: "Transactions", url: "/transactions" },
];

// const SettingsLinks: LinksType = [
//   { icon: "AccountBoxIcon", name: "Profile", url: "/profile" },
//   { icon: "SettingsIcon", name: "Account", url: "/account" },
//   { icon: "HomeIcon", name: "Addresses", url: "/addresses" },
// ];

const IconsArray: { [x: string]: any } = {
  DashboardIcon,
  AccountBalanceWalletIcon,
  SavingsIcon,
  ShoppingBasketIcon,
  ReceiptIcon,
  AccountBoxIcon,
  HomeIcon,
  SettingsIcon,
};

const Sidebar = () => {
  const location = useLocation();

  const [open, setOpen] = useState<boolean>(false);
  // const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [selectedRoute, setSelectedRoute] = React.useState(location.pathname);

  const handleClick = () => setOpen(() => !open);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top}>
        <Link to="/">
          <img src="/Images/Logo/Logo.png" alt="Logo" />
        </Link>
      </div>
      <div className={styles.sidebar__body}>
        {NormalLinks.map(({ icon, name, active, url }, index) => {
          const Icon = IconsArray[icon];
          return (
            <Link key={index} to={active ? url : "#"}>
              <ListItemButton
                disabled={!active}
                sx={{ mb: ".5rem", color: "#424a57" }}
                selected={selectedRoute === url}
                onClick={() => setSelectedRoute(url)}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          );
        })}

        {/* Export Links */}
        <List
          component="nav"
          sx={{ width: "100%" }}
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Exports
            </ListSubheader>
          }
        >
          {ExportLinks.map(({ icon, name, url }, index) => {
            const Icon = IconsArray[icon];
            return (
              <Link key={index} to={url}>
                <ListItemButton
                  sx={{ mb: ".5rem", color: "#424a57" }}
                  selected={selectedRoute.includes(url)}
                  onClick={() => setSelectedRoute(url)}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </Link>
            );
          })}
          <ListItemButton sx={{ mb: ".5rem" }} disabled onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Promotions" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4, mb: ".5rem" }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>

        {/* Settings */}
        <List
          sx={{ width: "100%" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Settings
            </ListSubheader>
          }
        >
          <Link to="/settings">
            <ListItemButton
              sx={{ mb: ".5rem", color: "#424a57" }}
              selected={selectedRoute.includes("/settings")}
              onClick={() => setSelectedRoute("/settings")}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="General" />
            </ListItemButton>
          </Link>
          {/* {SettingsLinks.map(({ icon, name, url }, index) => {
            const Icon = IconsArray[icon];
            const newUrl = `/settings${url}`;

            return (
              <Link key={index} to={newUrl}>
                <ListItemButton
                  sx={{ mb: ".5rem" }}
                  selected={selectedRoute === newUrl}
                  onClick={() => setSelectedRoute(newUrl)}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </Link>
            );
          })} */}
        </List>
      </div>
      <div className={styles.sidebar__footer}>
        <Link to="">About Us</Link>•<Link to="">Privacy Policy</Link>•
        <Link to="">Terms</Link>
        <Typography variant="body1">© Shipizzy v2022.10.26</Typography>
      </div>
    </div>
  );
};

export default Sidebar;
