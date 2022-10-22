import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import styles from "./Modal.module.scss";
import Backdrop from "@mui/material/Backdrop";
import React, { PropsWithChildren } from "react";
import Typography from "@mui/material/Typography";

type UIModalProps = PropsWithChildren<{
  title: string;
  open: boolean;
  handleClose?: (event: {}) => void;
}>;

const UIModal = ({ title, children, open, handleClose }: UIModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
        onClose={handleClose}
        BackdropComponent={Backdrop}
        aria-labelledby="modal-label"
        aria-describedby="modal-description"
      >
        <Fade in={open}>
          <Box className={styles.modal}>
            <Typography id="modal-label" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography
              sx={{
                mt: 2,
              }}
              id="modal-description"
            >
              {children}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default UIModal;
