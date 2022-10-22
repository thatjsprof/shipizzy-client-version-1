import React from "react";
import Box from "@mui/material/Box";
import UIButton, {
  UILoadingButton,
} from "Components/UI/Button/Button.component";
import Typography from "@mui/material/Typography";
import UIModal from "Components/UI/Modal/Modal.component";

interface IDeleteAddress {
  loading: boolean;
  showModal: boolean;
  onSubmitDelete: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAddressModal = ({
  loading,
  showModal,
  setShowModal,
  onSubmitDelete,
}: IDeleteAddress) => {
  return (
    <UIModal
      open={showModal}
      title="Delete Address"
      handleClose={() => {
        setShowModal(false);
      }}
    >
      <Box>
        <Typography>
          Are you Sure you want to{" "}
          <Box
            component="span"
            sx={{
              color: "#E6534E",
              fontStyle: "italic",
            }}
          >
            delete
          </Box>{" "}
          this Address?
        </Typography>
        <Box
          sx={{
            mt: 5,
            display: "flex",
          }}
        >
          <UIButton
            type="button"
            sx={{ mr: 2 }}
            variant="outlined"
            handleClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </UIButton>
          <UILoadingButton
            type="button"
            loading={loading}
            variant="contained"
            handleClick={() => {
              onSubmitDelete();
              setShowModal(false);
            }}
            sx={{
              color: "#fff",
              backgroundColor: "#E6534E",

              "&:hover": {
                backgroundColor: "#E6534E",
              },
            }}
          >
            Delete
          </UILoadingButton>
        </Box>
      </Box>
    </UIModal>
  );
};

export default DeleteAddressModal;
