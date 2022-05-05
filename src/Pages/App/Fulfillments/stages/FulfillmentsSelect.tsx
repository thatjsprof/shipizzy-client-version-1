import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UIButton from "../../../../Components/UI/Button/Button.component";

interface IProps {
  handleNext: () => void;
}

const FulfillmentsSelect = (props: IProps) => {
  const { handleNext } = props;

  return (
    <Box>
      <Box sx={{ p: 2, display: "grid", justifyContent: "center" }}>
        <Box sx={{ marginTop: "8rem", width: "50rem" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, letterSpacing: "1px" }}
          >
            Choose an Option
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Please select what you would like to do
          </Typography>

          <Box sx={{ marginTop: "8rem" }}>
            <UIButton
              styles={{
                width: "100%",
                padding: "0.8rem",
                marginBottom: "2rem",
                fontSize: "1.5rem",
              }}
              type="button"
              variant="outlined"
              handleClick={handleNext}
            >
              Book an Export
            </UIButton>
            <UIButton
              styles={{
                width: "100%",
                padding: "0.8rem",
                marginBottom: "2rem",
                fontSize: "1.5rem",
              }}
              disabled
              type="button"
              variant="outlined"
            >
              Book an Import
            </UIButton>
            <UIButton
              styles={{ width: "100%", padding: "0.8rem", fontSize: "1.5rem" }}
              type="button"
              variant="contained"
            >
              Request a Quote
            </UIButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FulfillmentsSelect;
