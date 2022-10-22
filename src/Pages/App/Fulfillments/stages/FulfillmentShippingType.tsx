import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import theme from "App/Layout/CustomTheme";
import { formatToNGN } from "Utils/Helpers";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  IPayloadInt,
  FulfillmentShippingRates,
  FulfillmentInsuranceOption,
} from "Interfaces/Fulfillment";
import { EditFulfillmentResponse } from "Graphql/Responses";
import { useAppDispatch, useAppSelector } from "Store/Hooks";
import { setFulfillmentOption } from "Store/FulfillmentSlice";
import { shippingData, insuranceData } from "Constants/Fulfillment";
import { UILoadingButton } from "Components/UI/Button/Button.component";

interface IProps {
  handleBack: () => void;
  handleNext: () => void;
  editFulfillment: (payload: IPayloadInt) => EditFulfillmentResponse;
}

const CheckboxStyled = styled(Box)<{
  state: { label: string; checked: string };
}>(({ state: { label, checked } }) => ({
  "& .MuiCheckbox-root": {
    padding: "0px",
  },
  padding: "20px",
  cursor: "pointer",
  borderRadius: "5px",
  marginBottom: "15px",
  border: `1px solid ${
    label === checked ? theme.palette.primary.main : "#ddd"
  }`,
  color: label === checked ? theme.palette.primary.dark : "#586274",
}));

const FulfillmentShippingType = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [shippingTypes] = React.useState(shippingData);
  const [insuranceTypes] = React.useState(insuranceData);
  const [loading, setLoading] = React.useState<boolean>(false);
  const fulfillment = useAppSelector((state) => state.fulfillment);
  const [shippingChecked, setShippingChecked] = React.useState("");
  const [insuranceChecked, setInsuranceChecked] = React.useState("");

  const { fulfillmentShipping } = fulfillment;
  const { handleBack, handleNext } = props;

  const handleChangeShipping = (selected: string) => {
    setShippingChecked(selected);
  };

  const handleChangeInsurance = (selected: string) => {
    setInsuranceChecked(selected);
  };

  const handleOnClick = async () => {
    setLoading(true);
    const data = await props.editFulfillment({
      id: fulfillment.id as string,
      fulfillmentDetails: {
        insurance: insuranceChecked as FulfillmentInsuranceOption,
        shippingOption: shippingChecked as FulfillmentShippingRates,
      },
    });

    if (data?.editFulfillment?._id) {
      setLoading(false);
      handleNext();
      dispatch(
        setFulfillmentOption({
          fulfillmentShipping: {
            shippingRate: shippingChecked as FulfillmentShippingRates,
            insuranceOption: insuranceChecked as FulfillmentInsuranceOption,
          },
        })
      );
    } else setLoading(false);
  };

  React.useEffect(() => {
    const insurance = fulfillmentShipping?.insuranceOption;
    const shippingRate = fulfillmentShipping?.shippingRate;

    if (insurance && shippingRate) {
      setShippingChecked(shippingRate);
      setInsuranceChecked(insurance);
    }
  }, [fulfillmentShipping]);

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
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              marginTop: "2rem",
              letterSpacing: "1px",
            }}
          >
            Select Preferred Shipping Option
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Select your preferred shipping rates
          </Typography>

          <Box
            component="form"
            sx={{
              marginTop: "2.5rem",
            }}
          >
            <Box>
              <Typography
                sx={{
                  mb: 3,
                  color: theme.palette.primary.dark,
                }}
              >
                Available Shipping rates:
              </Typography>

              {shippingTypes.map((type) => {
                const { label, name, description, price, note } = type;

                return (
                  <CheckboxStyled
                    key={label}
                    state={{ label, checked: shippingChecked }}
                    onClick={() => handleChangeShipping(label)}
                  >
                    <Box
                      sx={{
                        mb: 3,
                        display: "flex",
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Checkbox
                          checked={shippingChecked === label}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        {formatToNGN.format(parseInt(price))}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          mb: 1,
                          fontWeight: 700,
                        }}
                      >
                        {name}
                      </Typography>
                      <Typography
                        sx={{
                          maxWidth: "500px",
                        }}
                      >
                        {description}
                      </Typography>
                      {note && (
                        <Typography
                          sx={{
                            color: "red",
                          }}
                        >
                          {note}
                        </Typography>
                      )}
                    </Box>
                  </CheckboxStyled>
                );
              })}
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography
                sx={{
                  mb: 3,
                  color: theme.palette.primary.dark,
                }}
              >
                Insurance Options:
              </Typography>

              {insuranceTypes.map((type) => {
                const { label, name, description, price } = type;

                return (
                  <CheckboxStyled
                    key={label}
                    state={{ label, checked: insuranceChecked }}
                    onClick={() => handleChangeInsurance(label)}
                  >
                    <Box
                      sx={{
                        mb: 3,
                        display: "flex",
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Checkbox
                          checked={insuranceChecked === label}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        {!isNaN(parseInt(price))
                          ? formatToNGN.format(parseInt(price))
                          : price}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          mb: 1,
                          fontWeight: 700,
                        }}
                      >
                        {name}
                      </Typography>
                      <Typography
                        sx={{
                          maxWidth: "500px",
                        }}
                      >
                        {description}
                      </Typography>
                    </Box>
                  </CheckboxStyled>
                );
              })}
            </Box>

            <Box
              sx={{
                display: "flex",
                marginTop: "55px",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <Button onClick={handleBack} size="large" variant="outlined">
                  Back
                </Button>
              </Box>
              <UILoadingButton
                size="large"
                type="button"
                loading={loading}
                variant="contained"
                handleClick={handleOnClick}
                disabled={!shippingChecked || !insuranceChecked}
              >
                Next
              </UILoadingButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FulfillmentShippingType;
