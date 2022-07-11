import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import styles from "./Transactions.module.scss";
import Typography from "@mui/material/Typography";
import theme from "../../../App/Layout/CustomTheme";
import UIInput from "../../../Components/UI/Input/Input.component";
import TransactionsTable from "./Comopnents/TransactionsTable.component";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Transactions = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openAction = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <div className={styles.transactions}>
        <Typography variant="h5" sx={{ fontWeight: "normal", mb: 1 }}>
          Your Transactions
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
              aria-haspopup="true"
              onClick={handleClick}
              aria-controls="fade-menu"
              aria-expanded={openAction ? "true" : undefined}
              sx={{
                height: "2.5rem",
                border: `.1rem solid ${theme.palette.primary.main}`,
              }}
            >
              Filters <KeyboardArrowDownIcon />
            </Button>
          </Box>
          <Menu
            id="fade-menu"
            open={openAction}
            anchorEl={anchorEl}
            TransitionComponent={Fade}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
          >
            <MenuItem sx={{ width: "5rem" }}>Date</MenuItem>
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
