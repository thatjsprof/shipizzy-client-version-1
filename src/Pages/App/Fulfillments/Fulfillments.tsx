import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import UIButton from "../../../Components/UI/Button/Button.component";

const Fulfillments = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          maxWidth: "90% !important",
          margin: "3.2rem auto 0 auto",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5">Your Fulfillments</Typography>
        </Box>
        <Box>
          <Link to="/fulfillments/new">
            <UIButton size="large" type="button" variant="contained">
              Create New
            </UIButton>
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default Fulfillments;
