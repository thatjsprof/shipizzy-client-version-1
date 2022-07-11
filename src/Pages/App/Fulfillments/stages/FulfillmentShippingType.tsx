import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import Button from "@mui/material/Button";
import theme from "App/Layout/CustomTheme";
import { formatToNGN } from "Utils/Helpers";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { shippingData, insuranceData } from "Constants/Fulfillment";

interface IProps {
  handleBack: () => void;
  handleNext: () => void;
}

const FulfillmentShippingType = (props: IProps) => {
  const [shippingTypes] = React.useState(shippingData);
  const [insuranceTypes] = React.useState(insuranceData);
  const [shippingChecked, setShippingChecked] = React.useState("");
  const [insuranceChecked, setInsuranceChecked] = React.useState("");

  const { handleBack, handleNext } = props;

  const handleChangeShipping = (selected: string) => {
    setShippingChecked(selected);
  };

  const handleChangeInsurance = (selected: string) => {
    setInsuranceChecked(selected);
  };

  return (
    <Box>
      <Box sx={{ p: 2, display: "grid", justifyContent: "center" }}>
        <Box sx={{ width: "50rem" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, marginTop: "2rem", letterSpacing: "1px" }}
          >
            Select Preferred Shipping Option
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Select your preferred shipping rates
          </Typography>

          <Box component="form" sx={{ marginTop: "2.5rem" }}>
            <Box>
              <Typography sx={{ mb: 3, color: theme.palette.primary.dark }}>
                Available Shipping rates:
              </Typography>

              {shippingTypes.map((type) => {
                const { label, name, description, price, note } = type;

                const CheckboxStyled = styled(Box)(() => ({
                  padding: "20px",
                  color:
                    label === shippingChecked
                      ? theme.palette.primary.dark
                      : "#586274",
                  cursor: "pointer",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  border: `1px solid ${
                    label === shippingChecked
                      ? theme.palette.primary.main
                      : "#ddd"
                  }`,

                  "& .MuiCheckbox-root": {
                    padding: "0px",
                  },
                }));

                return (
                  <CheckboxStyled onClick={() => handleChangeShipping(label)}>
                    <Box sx={{ display: "flex", mb: 3 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Checkbox
                          inputProps={{ "aria-label": "controlled" }}
                          checked={shippingChecked === label}
                        />
                      </Box>
                      <Typography
                        sx={{ textTransform: "uppercase", fontWeight: 700 }}
                      >
                        {formatToNGN.format(parseInt(price))}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ mb: 1, fontWeight: 700 }}>
                        {name}
                      </Typography>
                      <Typography sx={{ maxWidth: "500px" }}>
                        {description}
                      </Typography>
                      {note && (
                        <Typography sx={{ color: "red" }}>{note}</Typography>
                      )}
                    </Box>
                  </CheckboxStyled>
                );
              })}
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography sx={{ mb: 3, color: theme.palette.primary.dark }}>
                Insurance Options:
              </Typography>

              {insuranceTypes.map((type) => {
                const { label, name, description, price } = type;

                const CheckboxStyled = styled(Box)(() => ({
                  padding: "20px",
                  color:
                    label === insuranceChecked
                      ? theme.palette.primary.dark
                      : "#586274",
                  cursor: "pointer",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  border: `1px solid ${
                    label === insuranceChecked
                      ? theme.palette.primary.main
                      : "#ddd"
                  }`,

                  "& .MuiCheckbox-root": {
                    padding: "0px",
                  },
                }));

                return (
                  <CheckboxStyled onClick={() => handleChangeInsurance(label)}>
                    <Box sx={{ display: "flex", mb: 3 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Checkbox
                          inputProps={{ "aria-label": "controlled" }}
                          checked={insuranceChecked === label}
                        />
                      </Box>
                      <Typography
                        sx={{ textTransform: "uppercase", fontWeight: 700 }}
                      >
                        {!isNaN(parseInt(price))
                          ? formatToNGN.format(parseInt(price))
                          : price}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ mb: 1, fontWeight: 700 }}>
                        {name}
                      </Typography>
                      <Typography sx={{ maxWidth: "500px" }}>
                        {description}
                      </Typography>
                    </Box>
                  </CheckboxStyled>
                );
              })}
            </Box>

            <Box sx={{ display: "flex", marginTop: "55px" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Button onClick={handleBack} size="large" variant="outlined">
                  Back
                </Button>
              </Box>
              <Button onClick={handleNext} size="large" variant="contained">
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FulfillmentShippingType;
