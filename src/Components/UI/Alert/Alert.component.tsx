import * as React from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { Warning } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface UIAlertProps {
  open: boolean;
  message: string | React.ReactNode;
  closeAlert: () => void;
}

export default function UIAlert({ open, message, closeAlert }: UIAlertProps) {
  return (
    <Collapse in={open}>
      <Alert
        icon={<Warning />}
        variant="outlined"
        severity="warning"
        sx={{
          mb: 3,
          borderRadius: "0.75rem",
        }}
        action={
          <IconButton
            size="small"
            color="inherit"
            aria-label="close"
            onClick={closeAlert}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
}
