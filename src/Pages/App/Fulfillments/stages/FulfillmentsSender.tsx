import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CheckBox from "@mui/material/Checkbox";
import MapIcon from "@mui/icons-material/Map";
import TourIcon from "@mui/icons-material/Tour";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import PublicIcon from "@mui/icons-material/Public";
import FormControl from "@mui/material/FormControl";
import ListSubheader from "@mui/material/ListSubheader";
import FormControlLabel from "@mui/material/FormControlLabel";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import UISelect from "../../../../Components/UI/Select/Select.component";
import UIOutlinedInput from "../../../../Components/UI/Input/OutlinedInput.component";

interface IProps {
  handleBack: () => void;
  handleNext: () => void;
}

const FulfillmentsSelect = (props: IProps) => {
  const [savedAddress, setSavedAddress] = React.useState(false);

  const { handleBack, handleNext } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSavedAddress(event.target.checked);
  };

  return (
    <Box>
      <Box sx={{ p: 2, display: "grid", justifyContent: "center" }}>
        <Box sx={{ width: "50rem" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, marginTop: "2rem", letterSpacing: "1px" }}
          >
            Sender's Information
          </Typography>
          <Typography sx={{ mt: 1, color: "#424a57" }}>
            Please provide the sender's information
          </Typography>

          <Box sx={{ marginTop: "3rem" }}>
            <Grid container spacing={2}>
              <Grid sx={{ display: "flex", paddingTop: "0px" }} xs={12}>
                <Box sx={{ flexGrow: 1 }}></Box>
                <FormControlLabel
                  control={
                    <CheckBox
                      sx={{
                        mr: 1,
                      }}
                      checked={savedAddress}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  sx={{
                    color: "#586274",
                    marginRight: "0px",
                  }}
                  label="Use a Saved Address"
                />
              </Grid>

              {savedAddress ? (
                <>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="saved-addresses">
                        Select an Address
                      </InputLabel>
                      <Select
                        defaultValue=""
                        id="saved-addresses"
                        label="Select an Address"
                        startAdornment={
                          <MapIcon sx={{ mr: 2, color: "#586274" }} />
                        }
                      >
                        <ListSubheader>Main Addresses</ListSubheader>
                        <MenuItem value={1}>Option 1</MenuItem>
                        <MenuItem value={2}>Option 2</MenuItem>
                        <ListSubheader>Sub Addresses</ListSubheader>
                        <MenuItem value={3}>Option 3</MenuItem>
                        <MenuItem value={4}>Option 4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <CheckBox
                          sx={{
                            mr: 1,
                          }}
                          checked={false}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      sx={{
                        color: "#586274",
                        display: "flex",
                      }}
                      label="Make this the default sender Address"
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={6}>
                    <UIOutlinedInput
                      label="Name"
                      type="text"
                      variant="outlined"
                      startAdornment={
                        <AccountCircleIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <UIOutlinedInput
                      label="Email Address"
                      type="text"
                      variant="outlined"
                      startAdornment={
                        <AlternateEmailIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <UIOutlinedInput
                      label="Phone Number"
                      type="text"
                      variant="outlined"
                      startAdornment={
                        <PermPhoneMsgIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <UIOutlinedInput
                      label="Address Line 1"
                      type="text"
                      variant="outlined"
                      startAdornment={
                        <MapIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <UIOutlinedInput
                      label="Address Line 2"
                      type="text"
                      variant="outlined"
                      startAdornment={
                        <MapIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <UISelect
                      label="Country"
                      options={[
                        { value: "Lagos", text: "Lagos" },
                        { value: "Abuja", text: "Abuja" },
                      ]}
                      startAdornment={
                        <PublicIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <UISelect
                      label="State"
                      options={[
                        { value: "Lagos", text: "Lagos" },
                        { value: "Abuja", text: "Abuja" },
                      ]}
                      startAdornment={
                        <TourIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <UISelect
                      label="City"
                      options={[
                        { value: "Lagos", text: "Lagos" },
                        { value: "Abuja", text: "Abuja" },
                      ]}
                      startAdornment={
                        <TourIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <UIOutlinedInput
                      label="Postal Code"
                      type="text"
                      variant="outlined"
                      startAdornment={
                        <MapIcon sx={{ mr: 2, color: "#586274" }} />
                      }
                    />
                  </Grid>
                </>
              )}
            </Grid>

            {!savedAddress && (
              <FormControlLabel
                control={
                  <CheckBox
                    sx={{
                      mr: 1,
                    }}
                    checked={false}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                sx={{
                  color: "#586274",
                  display: "flex",
                }}
                label="Save this Address"
              />
            )}

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

export default FulfillmentsSelect;
