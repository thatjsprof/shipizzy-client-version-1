import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import UIButton from "../../../Components/UI/Button/Button.component";
import UIInput from "../../../Components/UI/Input/Input.component";
import UIModal from "../../../Components/UI/Modal/Modal.component";
import WalletActivity from "./Components/WalletActivity";
import { formatToNGN } from "../../../Utils/Helpers";
import styles from "./Wallet.module.scss";
import { ListItem } from "@mui/material";
import UISelect from "../../../Components/UI/Select/Select.component";

const DOLLAR_RATE = 570;

const Wallet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openIssue, setOpenIssue] = useState<boolean>(false);
  const [nairaAmount, setNairaAmount] = useState<number>(0);
  const [dollarAmount, setDollarAmount] = useState<number>(0);

  const fundWallet = () => {
    setOpen(() => true);
  };

  const handleClose = () => {
    setOpen(() => false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setDollarAmount(Number((+value / DOLLAR_RATE).toFixed(2)));
    setNairaAmount(+value);
  };

  const WalletActivities = [
    {
      amount: 0,
      type: "credit",
      date: new Date(),
      purpose: "Wallet Opening",
      transaction_reference: "B430A3C007BB44EEB84417A07947D060",
    },
  ];

  return (
    <div className={styles.wallet}>
      <Box className={styles.wallet__section}>
        <Box className={styles.wallet__section___main}>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Balance
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              {formatToNGN.format(parseFloat(`${0}`))}{" "}
              <sup style={{ fontWeight: "normal", fontSize: "1.2rem" }}>
                $0.00
              </sup>
            </Typography>
            <UIButton
              type="button"
              variant="contained"
              styles={{ width: "12rem", padding: ".7rem" }}
              handleClick={fundWallet}
            >
              Fund Wallet
            </UIButton>
          </Box>
          <WalletActivity activities={WalletActivities} />
        </Box>
        <Box className={styles.wallet__section___aside}>
          <Typography sx={{ mt: "1rem" }}>About Wallets</Typography>
          <Box sx={{ backgroundColor: "#f6f6f7", p: "1rem", mt: "1rem" }}>
            <AccountBalanceWalletIcon
              sx={{ fontSize: "2.5rem", color: "#ffa64d" }}
            />
            <Typography variant="body2">
              You can pay for all your shipments using your wallet in 2 steps.
            </Typography>
            <ListItem sx={{ pb: ".2rem" }}>
              <Typography variant="body2">
                - Fund your wallet using your card
              </Typography>
            </ListItem>
            <ListItem sx={{ py: "0rem" }}>
              <Typography variant="body2">
                - Choose 'Pay with wallet' when paying for your shipments
              </Typography>
            </ListItem>
          </Box>
          <UIButton
            type="button"
            styles={{ marginTop: "2.5rem" }}
            variant="contained"
            handleClick={() => setOpenIssue(true)}
          >
            Report an Issue
          </UIButton>
        </Box>
      </Box>
      <UIModal open={open} title="Fund Your Wallet" handleClose={handleClose}>
        <UIInput
          name="amount"
          type="number"
          styles={{ marginBottom: "1rem" }}
          value={`${nairaAmount}`}
          handleChange={handleInputChange}
          label="Enter amount to fund"
        />
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
      <UIModal
        open={openIssue}
        title="Report an Issue"
        handleClose={() => setOpenIssue(false)}
      >
        <UISelect
          options={[{ text: "Invalid Transaction", value: "invalid" }]}
          label="Issue Type"
        ></UISelect>
        <UIInput
          maxRows={4}
          multiline
          name="amount"
          type="text"
          label="Description of issue"
        />
        <UIButton type="button" size="large" variant="contained" disabled>
          Report
        </UIButton>
      </UIModal>
    </div>
  );
};

export default Wallet;
