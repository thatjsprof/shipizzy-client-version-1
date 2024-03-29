import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      height: 4,
      border: 0,
      borderRadius: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[800]
          : theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      height: 4,
      border: 0,
      borderRadius: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[800]
          : theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    borderRadius: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : "rgba(191, 59, 39, 0.2)",
  },
}));

export default ColorlibConnector;
