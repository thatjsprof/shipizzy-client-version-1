import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SavingsIcon from "@mui/icons-material/Savings";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import styles from "./Sidebar.module.scss";

const NormalLinks: LinksType = [
  { icon: "DashboardIcon", name: "Dashboard", url: "/dashboard" },
  { icon: "AccountBalanceWalletIcon", name: "Wallet", url: "/wallet" },
  { icon: "SavingsIcon", name: "Investments", url: "/investments" },
];

const ExportLinks: LinksType = [
  {
    icon: "ShoppingBasketIcon",
    name: "Your Fulfillments",
    url: "/fulfillments",
  },
  { icon: "ReceiptIcon", name: "Transactions", url: "/transactions" },
];

const SettingsLinks: LinksType = [
  { icon: "AccountBoxIcon", name: "Your Account", url: "/profile" },
  { icon: "HomeIcon", name: "Addresses", url: "/addresses" },
];

const IconsArray: { [x: string]: any } = {
  DashboardIcon,
  AccountBalanceWalletIcon,
  SavingsIcon,
  ShoppingBasketIcon,
  ReceiptIcon,
  AccountBoxIcon,
  HomeIcon,
};

const Sidebar = () => {
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedRoute, setSelectedRoute] = React.useState(
    history.location.pathname
  );

  const handleClick = () => setOpen(() => !open);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top}>
        <img src="/Images/Logo/Logo.png" alt="Logo" />
      </div>
      <Divider></Divider>
      <div className={styles.sidebar__body}>
        {NormalLinks.map(({ icon, name, url }, index) => {
          const Icon = IconsArray[icon];
          return (
            <Link key={index} to={url}>
              <ListItemButton
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
          sx={{ width: "100%" }}
          component="nav"
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
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
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
          {SettingsLinks.map(({ icon, name, url }, index) => {
            const Icon = IconsArray[icon];
            const newUrl = `/settings${url}`;

            return (
              <Link key={index} to={newUrl}>
                <ListItemButton
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
          })}
        </List>
      </div>
      <div className={styles.sidebar__footer}>
        <Link to="">About Us</Link>•<Link to="">Privacy Policy</Link>•
        <Link to="">Terms</Link>
        <Typography variant="body1">© Shipizzy v2021.10.26</Typography>
      </div>
    </div>
  );
};

export default Sidebar;
