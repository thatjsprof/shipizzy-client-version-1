import {
  CreatePaymentResponse,
  VerifyPaymentResponse,
} from "Graphql/Responses";
import {
  IPayloadInt,
  FulfillmentStages,
  FulfillmentStagesReverse,
} from "Interfaces/Fulfillment";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import { IError } from "Utils/GraphqlRequest";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import FulfillmentsType from "./stages/FulfillmentsType";
import FulfillmentsSender from "./stages/FulfillmentSender";
import FulfillmentsStatus from "./stages/FulfillmentsStatus";
import { useAppDispatch, useAppSelector } from "Store/Hooks";
import FulfillmentsSelect from "./stages/FulfillmentsSelect";
import FulfillmentSummary from "./stages/FulfillmentSummary";
import FulfillmentsPayment from "./stages/FulfillmentPayment";
import { setFulfillmentOption } from "Store/FulfillmentSlice";
import ColorlibConnector from "./components/ColorlibConnector";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FulfillmentsRecepient from "./stages/FulfillmentsRecepient";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FulfillmentShippingType from "./stages/FulfillmentShippingType";
import { IPayloadValue, IVerifyPayloadValue } from "Interfaces/Payment";
import FulfillmentsItemDescription from "./stages/FulfillmentItemDescription";

interface IProps {
  makeEditUser: (payload: IPayloadInt) => Promise<any>;
  createFulfillment: (payload: IPayloadInt) => Promise<any>;
  makeEditFulfillment: (payload: IPayloadInt) => Promise<any>;
  addTransaction: (payload: { transactionDetails: any }) => Promise<any>;
  createPayment: (payload: IPayloadValue) => CreatePaymentResponse;
  verifyPayment: (payload: IVerifyPayloadValue) => Promise<{
    data: VerifyPaymentResponse;
    error: IError | null;
  }>;
}

export default function FulfillmentApplication({
  makeEditUser,
  createPayment,
  verifyPayment,
  addTransaction,
  createFulfillment,
  makeEditFulfillment,
}: IProps) {
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = React.useState(1);
  const { stage } = useAppSelector((state) => state.fulfillment);

  const Breadcrumb = ({
    index,
    children,
    stageInner,
  }: {
    index?: number;
    children: React.ReactElement;
    stageInner: FulfillmentStages;
  }) => {
    return (
      <Box
        component="span"
        onClick={() => {
          dispatch(
            setFulfillmentOption({
              stage: stageInner,
            })
          );
        }}
        sx={{ color: activeStep === index ? "#cc6600" : "#424a57" }}
      >
        {children}
      </Box>
    );
  };

  const pageSelectedState = [
    "",
    "",
    <Breadcrumb index={2} stageInner={FulfillmentStages.type}>
      <span>Fulfillment Type</span>
    </Breadcrumb>,
    <Breadcrumb index={3} stageInner={FulfillmentStages.sender}>
      <span>Sender's information</span>
    </Breadcrumb>,
    <Breadcrumb index={4} stageInner={FulfillmentStages.receiver}>
      <span>Receiver's information</span>
    </Breadcrumb>,
    <Breadcrumb index={5} stageInner={FulfillmentStages.item}>
      <span>Items Description</span>
    </Breadcrumb>,
    <Breadcrumb index={6} stageInner={FulfillmentStages.shipping}>
      <span>Shipping Option</span>
    </Breadcrumb>,
    <Breadcrumb index={7} stageInner={FulfillmentStages.summary}>
      <span>Summary</span>
    </Breadcrumb>,
    <Breadcrumb index={8} stageInner={FulfillmentStages.payment}>
      <span> Payment</span>
    </Breadcrumb>,
    <Breadcrumb index={9} stageInner={FulfillmentStages.payment}>
      <span> Payment Status</span>
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

  const steps = Array.from({ length: 9 }, () => "");
  const pages = [
    "",
    <FulfillmentsSelect handleNext={handleNext} />,
    <FulfillmentsType
      handleBack={handleBack}
      handleNext={handleNext}
      createFulfillment={createFulfillment}
    />,
    <FulfillmentsSender
      handleBack={handleBack}
      handleNext={handleNext}
      makeEditUser={makeEditUser}
      editFulfillment={makeEditFulfillment}
    />,
    <FulfillmentsRecepient
      handleBack={handleBack}
      handleNext={handleNext}
      makeEditUser={makeEditUser}
      editFulfillment={makeEditFulfillment}
    />,
    <FulfillmentsItemDescription
      handleBack={handleBack}
      handleNext={handleNext}
      editFulfillment={makeEditFulfillment}
    />,
    <FulfillmentShippingType
      handleBack={handleBack}
      handleNext={handleNext}
      editFulfillment={makeEditFulfillment}
    />,
    <FulfillmentSummary
      handleBack={handleBack}
      handleNext={handleNext}
      handleSelect={handleSelect}
    />,
    <FulfillmentsPayment
      handleBack={handleBack}
      verifyPayment={verifyPayment}
      addTransaction={addTransaction}
      editFulfillment={makeEditFulfillment}
    />,
    <FulfillmentsStatus />,
  ];

  useEffect(() => {
    setActiveStep(FulfillmentStagesReverse[stage as FulfillmentStages] || 1);

    if (stage === "FULFILLMENT_STATUS") {
      setActiveStep(FulfillmentStagesReverse["FULFILLMENT_STATUS"]);
    }
  }, [stage]);

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "50px",
      }}
    >
      {activeStep !== FulfillmentStagesReverse["FULFILLMENT_STATUS"] && (
        <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((_, index) => (
            <Step key={index} sx={{ padding: "0" }}></Step>
          ))}
        </Stepper>
      )}
      <Box>
        {activeStep === steps.length + 1 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                pt: 2,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  flex: "1 1 auto",
                }}
              />
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to="/fulfillments">
                <Box
                  sx={{
                    py: ".3rem",
                    px: ".5rem",
                    mr: "1.5rem",
                    borderRadius: ".5rem",
                    border: ".1rem solid #ddd",
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
                  {[
                    pageSelectedState.slice(
                      activeStep !==
                        FulfillmentStagesReverse["FULFILLMENT_STATUS"]
                        ? 1
                        : activeStep,
                      activeStep + 1
                    ),
                  ]}
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
