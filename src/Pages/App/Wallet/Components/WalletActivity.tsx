import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Moment from "react-moment";
import styles from "./WalletActivity.module.scss";

interface WalletActivityProps {
  activities: {
    amount: number;
    date: Date;
    purpose: string;
    transaction_reference: string;
    type: string;
  }[];
}

const WalletActivity = ({ activities }: WalletActivityProps) => {
  return (
    <div className={styles.wallet_activity}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Activity
      </Typography>

      <Divider />
      {activities.map((activity) => {
        return (
          <Box sx={{ cursor: "pointer" }}>
            <Box sx={{ display: "flex", py: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex" }}>
                  <ArrowDownwardIcon />
                  <Box>
                    <Typography>{activity.purpose}</Typography>
                    <Typography>
                      <Moment>{activity.date}</Moment>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography sx={{ verticalAlign: "middle" }}>
                {activity.amount}
              </Typography>
            </Box>
            <Divider />
          </Box>
        );
      })}
    </div>
  );
};

export default WalletActivity;
