import React from "react";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import Menu from "@mui/material/Menu";
import styles from "./Navbar.module.scss";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import { Link, useNavigate } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import UISelect from "../../UI/Select/Select.component";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    navigate("/login");
    toast.success("You have logged out");
  };

  const currencies = [
    {
      value: "usd",
      text: "🇺🇸 USD",
    },
    {
      value: "ngn",
      text: "🇺🇳 NGN",
    },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Tooltip title="Account settings">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
              <Avatar sx={{ width: 32, height: 32 }}>D</Avatar>
            </IconButton>
          </Tooltip>
          <Box sx={{ verticalAlign: "middle" }}>
            <span
              style={{
                marginTop: ".5rem",
                marginRight: "1rem",
                display: "inline-block",
              }}
            >
              Currency
            </span>
            <UISelect
              size="small"
              defaultValue="usd"
              emptyValue={false}
              options={currencies}
              style={{ height: "0rem", width: "6.5rem" }}
            />
          </Box>
        </Box>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Link to="/settings/profile">
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
          </Link>
          <Divider />
          <Link to="/settings">
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
          </Link>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
