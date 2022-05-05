import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import theme from "../../../../App/Layout/CustomTheme";

interface IProps {
  handleBack: () => void;
  handleNext: () => void;
}

const FulfillmentsType = (props: IProps) => {
  const [checked, setChecked] = React.useState("");

  const { handleBack, handleNext } = props;

  const handleChange = (selected: string) => {
    setChecked(selected);
  };

  const fulfillmentTypes = [
    {
      name: "Drop-off",
      label: "drop-off",
      description:
        "Drop off your items at the nearest Shipizzy fulfillment center",
      price: "Free",
    },
    {
      name: "Request a Pick-up",
      label: "pick-up",
      description:
        "Pick up within Lagos is free. A dispatch rider will pick up your items at your preferred location",
      price: "N500 / Free",
    },
  ];

  return (
    <Box>
      <Box sx={{ p: 2, display: "grid", justifyContent: "center" }}>
        <Box sx={{ width: "50rem" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, marginTop: "2rem", letterSpacing: "1px" }}
          >
            Fulfillment Type
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Please select your preferred shipping option
          </Typography>

          <Box sx={{ marginTop: "3rem" }}>
            {fulfillmentTypes.map((type) => {
              const { name, label, description, price } = type;

              const CheckboxStyled = styled(Box)(() => ({
                padding: "20px",
                color:
                  label === checked ? theme.palette.primary.dark : "#586274",
                cursor: "pointer",
                borderRadius: "5px",
                marginBottom: "15px",
                border: `1px solid ${
                  label === checked ? theme.palette.primary.main : "#ddd"
                }`,

                "& .MuiCheckbox-root": {
                  padding: "0px",
                },
              }));

              return (
                <CheckboxStyled onClick={() => handleChange(label)}>
                  <Box sx={{ display: "flex", mb: 3 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Checkbox
                        inputProps={{ "aria-label": "controlled" }}
                        checked={checked === label}
                      />
                    </Box>
                    <Typography
                      sx={{ textTransform: "uppercase", fontWeight: 700 }}
                    >
                      {price}
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

export default FulfillmentsType;
