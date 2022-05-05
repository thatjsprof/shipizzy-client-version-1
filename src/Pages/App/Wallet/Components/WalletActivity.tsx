import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UIModal from "../../../../Components/UI/Modal/Modal.component";
import { formatToNGN, UppercaseTransform } from "../../../../Utils/Helpers";
import styles from "./WalletActivity.module.scss";
import theme from "../../../../App/Layout/CustomTheme";

type Activity = {
  amount: number;
  date: Date;
  purpose: string;
  transaction_reference: string;
  type: string;
};
interface WalletActivityProps {
  activities: Activity[];
}

const WalletActivity = ({ activities }: WalletActivityProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activity, setActivity] = useState<Activity>();

  const handleClose = () => {
    setOpen(() => false);
  };

  const setCurrentActivity = (activity: Activity) => {
    setOpen(() => true);
    setActivity(activity);
  };

  return (
    <div className={styles.wallet_activity}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Activity
      </Typography>

      {activities.map((activity, index) => {
        return (
          <Box
            sx={{
              cursor: "pointer",
              backgroundColor: "#fff",
              p: ".5rem 2rem",
              mb: index === activities.length - 1 ? "0rem" : "1rem",
            }}
            onClick={() => setCurrentActivity(activity)}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 2,
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      position: "relative",
                      borderRadius: "50%",
                      mr: 2,
                      p: "1.4rem",
                      backgroundColor: theme.palette.success.light,
                      color: theme.palette.success.main,
                    }}
                  >
                    <ArrowDownwardIcon
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography>{activity.purpose}</Typography>
                    <Typography>{activity.date.toLocaleString()}</Typography>
                  </Box>
                </Box>
              </Box>
              <Typography
                sx={{ color: theme.palette.success.main, fontSize: "1.2rem" }}
              >
                {formatToNGN.format(parseFloat(`${activity.amount}`))}
              </Typography>
            </Box>
          </Box>
        );
      })}
      <UIModal open={open} title="Transaction Detail" handleClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 3,
            px: 4,
            mb: 1,
            mt: 4,
            backgroundColor: "#f6f6f7",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography>Amount</Typography>
          </Box>
          <Box sx={{ color: theme.palette.success.main }}>
            {`₦${Number(activity?.amount.toFixed(2))}`}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 3,
            px: 4,
            mb: 1,
            backgroundColor: "#f6f6f7",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography>Type</Typography>
          </Box>
          <Box sx={{ color: theme.palette.success.main }}>
            {UppercaseTransform(activity?.type as string)}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 3,
            px: 4,
            mb: 1,
            backgroundColor: "#f6f6f7",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography>Reference</Typography>
          </Box>
          <Box>{activity?.transaction_reference}</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 3,
            px: 4,
            mb: 1,
            backgroundColor: "#f6f6f7",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography>Date</Typography>
          </Box>
          <Box>{activity?.date.toLocaleString()}</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 3,
            px: 4,
            mb: 1,
            backgroundColor: "#f6f6f7",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography>Purpose</Typography>
          </Box>
          <Box>{activity?.purpose}</Box>
        </Box>
      </UIModal>
    </div>
  );
};

export default WalletActivity;
