import React from "react";
import Box from "@mui/material/Box";
import theme from "App/Layout/CustomTheme";
import Typography from "@mui/material/Typography";

interface IProps {
  handleBack: () => void;
  handleNext: () => void;
}

const FulfillmentSummary = (props: IProps) => {
  const { handleBack, handleNext } = props;

  return (
    <Box>
      <Box sx={{ p: 2, display: "grid", justifyContent: "center" }}>
        <Box sx={{ width: "50rem" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, marginTop: "2rem", letterSpacing: "1px" }}
          >
            Order Summary
          </Typography>
          <Typography sx={{ mt: 1 }}>Confirm your order information</Typography>

          <Box component="form">
            <Box sx={{ marginTop: "2.5rem" }}>
              <Typography sx={{ mb: 1, color: theme.palette.primary.dark }}>
                Sender
              </Typography>
              <Box>
                <Typography>David Ajayi</Typography>
                <Typography>12, Adesanya street, Lekki, Lagos.</Typography>
                <Typography>david.ajayi@gmail.com</Typography>
                <Typography>07043891641</Typography>
              </Box>
            </Box>
            <Box sx={{ marginTop: "2.5rem" }}>
              <Typography sx={{ mb: 1, color: theme.palette.primary.dark }}>
                Receiver
              </Typography>
              <Box>
                <Typography>David Ajayi</Typography>
                <Typography>12, Adesanya street, Lekki, Lagos.</Typography>
                <Typography>david.ajayi@gmail.com</Typography>
                <Typography>07043891641</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FulfillmentSummary;
