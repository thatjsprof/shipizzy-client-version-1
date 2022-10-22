import React from "react";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";
import { useAppDispatch } from "Store/Hooks";
import Typography from "@mui/material/Typography";
import QuoteModal from "../components/QuoteModal";
import UIButton from "Components/UI/Button/Button.component";
import { setFulfillmentOption } from "Store/FulfillmentSlice";
import { FulfillmentOption, FulfillmentStages } from "Interfaces/Fulfillment";

interface IProps {
  handleNext: () => void;
}

const FulfillmentsSelect = (props: IProps) => {
  const { handleNext } = props;
  const dispatch = useAppDispatch();
  const [show, setShow] = React.useState<boolean>(false);

  const handleClick = (option: FulfillmentOption) => {
    dispatch(
      setFulfillmentOption({
        fulfillmentOption: option,
        stage: FulfillmentStages.type,
      })
    );
    handleNext();
  };

  const buttonStyle: SxProps = {
    width: "100%",
    padding: "0.8rem",
    fontSize: "1.5rem",
  };

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
            marginTop: "8rem",
            width: "50rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Choose an Option
          </Typography>
          <Typography
            sx={{
              mt: 1,
            }}
          >
            Please select what you would like to do
          </Typography>

          <Box
            sx={{
              marginTop: "8rem",
            }}
          >
            <UIButton
              styles={{
                ...buttonStyle,
                marginBottom: "2rem",
              }}
              type="button"
              variant="outlined"
              handleClick={() => handleClick("export")}
            >
              Book an Export
            </UIButton>
            <UIButton
              styles={{
                ...buttonStyle,
                marginBottom: "2rem",
              }}
              disabled
              type="button"
              variant="outlined"
              handleClick={() => handleClick("import")}
            >
              Book an Import
            </UIButton>
            <UIButton
              type="button"
              variant="contained"
              styles={buttonStyle}
              handleClick={() => setShow(true)}
            >
              Request a Quote
            </UIButton>
          </Box>
        </Box>
      </Box>
      <QuoteModal
        show={show}
        close={() => {
          setShow(false);
        }}
        title="Request a quote"
      />
    </Box>
  );
};

export default FulfillmentsSelect;
