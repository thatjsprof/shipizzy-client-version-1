import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UIButton from "../../../Components/UI/Button/Button.component";
import UIInput from "../../../Components/UI/Input/Input.component";
import UIModal from "../../../Components/UI/Modal/Modal.component";
import WalletActivity from "./Components/WalletActivity";
import styles from "./Wallet.module.scss";

const Wallet = () => {
  const [open, setOpen] = useState<boolean>(false);

  const fundWallet = () => {
    setOpen(() => true);
  };

  const handleClose = () => {
    setOpen(() => false);
  };

  const WalletActivities = [
    {
      amount: 200,
      type: "credit",
      date: new Date(),
      purpose: "Account Opening",
      transaction_reference: "B430A3C007BB44EEB84417A07947D060",
    },
  ];

  return (
    <div className={styles.wallet}>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Balance
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          ₦0.00
        </Typography>
        <UIButton
          type="button"
          variant="contained"
          styles={{ width: "12rem", padding: ".7rem" }}
          handleClick={fundWallet}
        >
          Add Money
        </UIButton>
      </Box>
      <WalletActivity activities={WalletActivities} />
      <UIModal open={open} title="Fund Your Wallet" handleClose={handleClose}>
        <UIInput type="text" label="Enter amount to fund" />
        <UIButton
          type="button"
          size="large"
          styles={{ width: "100%" }}
          variant="contained"
          disabled
        >
          Fund Wallet
        </UIButton>
      </UIModal>
    </div>
  );
};

export default Wallet;
