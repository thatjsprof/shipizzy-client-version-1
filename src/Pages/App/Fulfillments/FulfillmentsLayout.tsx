import * as React from "react";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import FulfillmentsType from "./stages/FulfillmentsType";
import FulfillmentsSelect from "./stages/FulfillmentsSelect";
import FulfillmentsSender from "./stages/FulfillmentsSender";
import FulfillmentSummary from "./stages/FulfillmentSummary";
import ColorlibConnector from "./components/ColorlibConnector";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FulfillmentsReceiver from "./stages/FulfillmentsReceiver";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FulfillmentShippingType from "./stages/FulfillmentShippingType";
import FulfillmentsItemDescription from "./stages/FulfillmentItemDescription";

export default function FulfillmentApplication() {
  const [activeStep, setActiveStep] = React.useState(1);

  const Breadcrumb = ({
    index,
    children,
  }: {
    index?: number;
    children: React.ReactElement;
  }) => (
    <Box
      component="span"
      onClick={() => handleSelect(index as number)}
      sx={{ color: activeStep === index ? "#cc6600" : "#424a57" }}
    >
      {children}
    </Box>
  );

  const pageSelectedState = [
    "",
    "",
    <Breadcrumb index={2}>
      <span>Fulfillment Type</span>
    </Breadcrumb>,
    <Breadcrumb index={3}>
      <span>Sender's information</span>
    </Breadcrumb>,
    <Breadcrumb index={4}>
      <span>Receiver's information</span>
    </Breadcrumb>,
    <Breadcrumb index={5}>
      <span>Items Description</span>
    </Breadcrumb>,
    <Breadcrumb index={6}>
      <span>Shipping Option</span>
    </Breadcrumb>,
    <Breadcrumb index={7}>
      <span>Summary</span>
    </Breadcrumb>,
  ];

  const handleSelect = (index: number) => {
    setActiveStep(index);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
  };

  const steps = Array.from({ length: 8 }, () => "");
  const pages = [
    "",
    <FulfillmentsSelect handleNext={handleNext} />,
    <FulfillmentsType handleBack={handleBack} handleNext={handleNext} />,
    <FulfillmentsSender handleBack={handleBack} handleNext={handleNext} />,
    <FulfillmentsReceiver handleBack={handleBack} handleNext={handleNext} />,
    <FulfillmentsItemDescription
      handleBack={handleBack}
      handleNext={handleNext}
    />,
    <FulfillmentShippingType handleBack={handleBack} handleNext={handleNext} />,
    <FulfillmentSummary handleBack={handleBack} handleNext={handleNext} />,
  ];

  return (
    <Box sx={{ width: "100%", marginBottom: "50px" }}>
      <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((_, index) => (
          <Step key={index} sx={{ padding: "0" }}></Step>
        ))}
      </Stepper>
      <Box>
        {activeStep === steps.length ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: "90%",
              margin: "3.2rem auto 0 auto",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/fulfillments">
                <Box
                  sx={{
                    border: ".1rem solid #ddd",
                    py: ".3rem",
                    px: ".5rem",
                    borderRadius: ".5rem",
                    mr: "1.5rem",
                  }}
                >
                  <ArrowBackIosNewIcon fontSize="small" />
                </Box>
              </Link>
              <Stack spacing={2}>
                <Breadcrumbs
                  sx={{
                    color: "#000",
                    cursor: "pointer",
                    justifyContent: "center",
                  }}
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  {[pageSelectedState.slice(1, activeStep + 1)]}
                </Breadcrumbs>
              </Stack>
            </Box>
            {pages[activeStep]}
          </Box>
        )}
      </Box>
    </Box>
  );
}
