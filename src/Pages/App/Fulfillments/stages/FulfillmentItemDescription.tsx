import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";
import theme from "../../../../App/Layout/CustomTheme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UISelect from "../../../../Components/UI/Select/Select.component";
import UIOutlinedInput from "../../../../Components/UI/Input/OutlinedInput.component";

interface IProps {
  handleBack: () => void;
  handleNext: () => void;
}

const FulfillmentItemDescription = (props: IProps) => {
  const [items] = React.useState([{}]);

  const { handleBack, handleNext } = props;

  return (
    <Box>
      <Box sx={{ p: 2, display: "grid", justifyContent: "center" }}>
        <Box sx={{ width: "50rem" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, marginTop: "2rem", letterSpacing: "1px" }}
          >
            Detailed Item Desciption
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Please enter information about the items you want to ship
          </Typography>

          <Box component="form" sx={{ marginTop: "3rem" }}>
            {items.map((item) => {
              return (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <UISelect
                      label="Item Category"
                      options={[
                        { value: "Lagos", text: "Lagos" },
                        { value: "Abuja", text: "Abuja" },
                      ]}
                      startAdornment={
                        <PublicIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <UIOutlinedInput
                      type="text"
                      variant="outlined"
                      label="Item Description"
                      startAdornment={
                        <AccountCircleIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <UIOutlinedInput
                      type="text"
                      variant="outlined"
                      label="Item Quantity"
                      startAdornment={
                        <AccountCircleIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <UIOutlinedInput
                      type="text"
                      variant="outlined"
                      label="Item Weight (KG)"
                      startAdornment={
                        <AccountCircleIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <UIOutlinedInput
                      type="text"
                      variant="outlined"
                      label="Item Value (₦)"
                      startAdornment={
                        <AccountCircleIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>
                </Grid>
              );
            })}

            <Typography
              sx={{
                mt: 2,
                display: "flex",
                color: "#586274",
                cursor: "pointer",
              }}
            >
              <AddCircleOutlineIcon
                sx={{ mr: 2, color: theme.palette.primary.main }}
              />
              <Box component="span">Add Another Item</Box>
            </Typography>

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

export default FulfillmentItemDescription;
