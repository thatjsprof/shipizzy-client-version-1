import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";
import ApexCharts from "react-apexcharts";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import styles from "./Dashboard.module.scss";
import { useAppSelector } from "Store/Hooks";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import theme from "../../../App/Layout/CustomTheme";
import FormControlLabel from "@mui/material/FormControlLabel";
import UICard from "../../../Components/UI/Card/Card.component";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import UIModal from "../../../Components/UI/Modal/Modal.component";
import UIInput from "../../../Components/UI/Input/Input.component";
import UIButton from "../../../Components/UI/Button/Button.component";
import UISelect from "../../../Components/UI/Select/Select.component";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type quickActions = "Withdraw" | "Fund";

const DOLLAR_RATE = 570;

const Dashboard = () => {
  const series = [
    {
      name: "Income",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ];

  const options = {
    colors: ["#055C9D"],
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      show: true,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const [open, setOpen] = React.useState<boolean>(false);
  const [nairaAmount, setNairaAmount] = React.useState<number>(0);
  const [dollarAmount, setDollarAmount] = React.useState<number>(0);
  const [openQuickActionModal, setOpenQuickActionModal] =
    React.useState<boolean>(false);
  const [quickAction, setQuickAction] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openAction = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { user } = useAppSelector((state) => state.user);

  const handleCloseAction = (value: quickActions) => {
    setQuickAction(value);
    setOpenQuickActionModal(true);
    setAnchorEl(null);
  };

  const handleCloseQuickAction = () => {
    setOpenQuickActionModal(false);
  };

  const ExtractText = () => {
    return `${quickAction} ${quickAction === "Withdraw" ? "to" : ""} `;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setDollarAmount(Number((+value / DOLLAR_RATE).toFixed(2)));
    setNairaAmount(+value);
  };

  return (
    <div className={styles.dashboard}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Welcome Back, {user.firstName}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h6" sx={{ my: "2rem", flexGrow: 1 }}>
          Overview
        </Typography>
        {/* <Button
          id="fade-button"
          aria-controls="fade-menu"
          aria-haspopup="true"
          aria-expanded={openAction ? "true" : undefined}
          sx={{
            border: `.1rem solid ${theme.palette.primary.main}`,
            height: "3rem",
            mt: "1.5rem",
          }}
          onClick={handleClick}
        >
          Quick Actions <KeyboardArrowDownIcon />
        </Button> */}
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
          <MenuItem
            sx={{ width: "7.8rem" }}
            onClick={() => handleCloseAction("Fund")}
          >
            Fund
          </MenuItem>
          <MenuItem onClick={() => handleCloseAction("Withdraw")}>
            Withdraw
          </MenuItem>
        </Menu>
        <UIModal
          title={`${ExtractText()} your account`}
          open={openQuickActionModal}
          handleClose={handleCloseQuickAction}
        >
          <UIInput
            type="number"
            styles={{ marginBottom: "1rem" }}
            handleChange={handleInputChange}
            label={`Enter Amount to ${quickAction}`}
          ></UIInput>
          <Typography sx={{ mb: "1rem", p: "0rem" }}>
            {`$${dollarAmount} at N${DOLLAR_RATE} to $1`}
          </Typography>
          <UIButton
            type="button"
            size="large"
            styles={{ width: "100%" }}
            variant="contained"
            disabled={!nairaAmount}
          >
            {`${ExtractText()}`} your Account
          </UIButton>
        </UIModal>
      </Box>
      <Box className={styles.dashboard__section}>
        <Box className={styles.dashboard__section___main}>
          <div className={styles.dashboard__cards}>
            <Link to="/transactions">
              <UICard
                styles={{
                  backgroundColor: theme.palette.primary.main,
                  color: "#fff",
                }}
                title="Total Transactions Value"
              >
                <Typography
                  variant="h5"
                  sx={{ color: "#fff", fontWeight: 700 }}
                >
                  ₦0.00
                </Typography>
              </UICard>
            </Link>
            <Link to="/fulfillments">
              <UICard title="2 Pending Fulfillments">
                <Typography variant="body2" sx={{ mt: "1rem" }}>
                  Go to Pending Fulfillments
                  <ArrowRightAltIcon sx={{ verticalAlign: "middle" }} />
                </Typography>
              </UICard>
            </Link>
          </div>
          <Typography variant="h6" sx={{ mt: "3rem", flexGrow: 1 }}>
            Your Transactions Volume
          </Typography>
          <div className={styles.dashboard__chart}>
            <ApexCharts
              options={options}
              series={series}
              type="area"
              height={350}
            />
          </div>
        </Box>
        <Box className={styles.dashboard__section___aside}>
          {/* <Box sx={{ display: "flex", marginBottom: "1rem" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Wallet Balance</Typography>
              <Typography variant="h3">₦0.00</Typography>
            </Box>
            <IconButton
              aria-label="add"
              className={styles.icon}
              onClick={handleOpen}
            >
              <AddIcon />
            </IconButton>
            <UIModal
              title="Fund your Account"
              open={open}
              handleClose={handleClose}
            >
              <UIInput
                type="number"
                label="Enter Amount"
                styles={{ marginBottom: "1rem" }}
                handleChange={handleInputChange}
              ></UIInput>
              <Typography sx={{ mb: "1rem", p: "0rem" }}>
                {`$${dollarAmount} at N${DOLLAR_RATE} to $1`}
              </Typography>
              <UIButton
                type="button"
                size="large"
                styles={{ width: "100%" }}
                variant="contained"
                disabled={!nairaAmount}
              >
                Fund Wallet
              </UIButton>
            </UIModal>
          </Box>
          <Divider /> */}
          <Box sx={{ marginTop: "1rem" }}>
            <Typography variant="h6" sx={{ mb: "1.5rem" }}>
              Shipping Rate Calculator
            </Typography>
            <UISelect
              options={[
                { text: "Asia", value: "asia" },
                { text: "Belgium", value: "belgium" },
              ]}
              defaultValue=""
              emptyValue={false}
              label="Select Country"
            />
            <UIInput type="text" label="Enter Weight in Pounds" />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Door to Door"
              />
              <FormControlLabel control={<Checkbox />} label="Port" />
            </FormGroup>
            <Typography sx={{ my: "1rem" }}>Total Amount to Pay</Typography>
            <Box
              sx={{
                backgroundColor: "#ddd",
                p: "1rem",
                borderRadius: ".5rem",
                mb: "2.5rem",
              }}
            >
              <Typography variant="h5">$0</Typography>
            </Box>
            <Typography variant="body2">
              <span style={{ color: theme.palette.warning.main }}>Note:</span>{" "}
              Prices are subject to FX volatility
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
