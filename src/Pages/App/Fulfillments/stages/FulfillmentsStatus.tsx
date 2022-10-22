import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useAppSelector } from "Store/Hooks";
import { formatNumber } from "Utils/Helpers";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import NavigationIcon from "@mui/icons-material/Navigation";

const TypographyStyled = styled(Typography)(() => ({
  fontSize: "1.5rem",
}));

const FulfillmentStatus = () => {
  const { fulfillmentPaymentInformation } = useAppSelector(
    (state) => state.fulfillment
  );

  return (
    <Box>
      <Box
        sx={{
          p: 2,
          display: "grid",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "50rem",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {fulfillmentPaymentInformation?.status === "success" && (
            <>
              <Box
                alt="Logo"
                sx={{ mb: 5 }}
                height="100px"
                component="img"
                src="/Images/Misc/payment.png"
              />

              <Box
                sx={{
                  mb: 4,
                  fontSize: "3rem",
                  textAlign: "center",
                }}
              >
                <TypographyStyled>
                  Your Payment of{" "}
                  {formatNumber().format(fulfillmentPaymentInformation?.amount)}{" "}
                  was successfully processed
                </TypographyStyled>
                <Typography sx={{ mt: 1 }}>
                  A Copy of the payment receipt has been sent to your mail
                </Typography>
              </Box>
              <Fab
                variant="extended"
                sx={{
                  marginTop: "6rem",
                  boxShadow: "none",
                }}
              >
                <NavigationIcon sx={{ mr: 1 }} />
                View Fulfillments
              </Fab>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FulfillmentStatus;
