import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Fade from "@mui/material/Fade";
import styles from "./Transactions.module.scss";
import TransactionsTable from "./Comopnents/TransactionsTable.component";
import theme from "../../../App/Layout/CustomTheme";
import UIInput from "../../../Components/UI/Input/Input.component";

const Transactions = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openAction = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <div className={styles.transactions}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Your Transactions
        </Typography>
        <Typography variant="body1">
          View status of all the transactions made on your account
        </Typography>
        <Box sx={{ display: "flex", mt: 6 }}>
          <UIInput
            type="text"
            size="small"
            label="Search Transactions"
            styles={{ maxWidth: "20rem", flexGrow: 1 }}
          />
          <Box>
            <Button
              id="fade-button"
              aria-controls="fade-menu"
              aria-haspopup="true"
              aria-expanded={openAction ? "true" : undefined}
              sx={{
                border: `.1rem solid ${theme.palette.primary.main}`,
                height: "2.5rem",
              }}
              onClick={handleClick}
            >
              Filters <KeyboardArrowDownIcon />
            </Button>
          </Box>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={openAction}
            onClose={() => setAnchorEl(null)}
            TransitionComponent={Fade}
          >
            <MenuItem>Date</MenuItem>
            <MenuItem>Status</MenuItem>
          </Menu>
        </Box>
        <Box sx={{ mt: 2 }}>
          <TransactionsTable />
        </Box>
        <Typography sx={{ mt: 3 }}>
          <span style={{ color: theme.palette.primary.main }}>Note: </span>
          This table shows all transactions captured by Shipizzy.
        </Typography>
      </div>
    </div>
  );
};

export default Transactions;
