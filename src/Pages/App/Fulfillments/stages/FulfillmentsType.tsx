import {
  IFulfillment,
  FulfillmentTypes,
  FulfillmentStages,
  FulfillmentStatus,
} from "Interfaces/Fulfillment";
import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import theme from "App/Layout/CustomTheme";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { fulfillmentTypes } from "Constants/Fulfillment";
import { useAppDispatch, useAppSelector } from "Store/Hooks";
import { setFulfillmentOption } from "Store/FulfillmentSlice";

interface IProps {
  handleBack: () => void;
  handleNext: () => void;
  createFulfillment: (payload: {
    fulfillmentDetails: IFulfillment;
  }) => Promise<any>;
}

const FulfillmentsType = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { fulfillmentType } = useAppSelector((state) => state.fulfillment);
  const [checked, setChecked] = React.useState<FulfillmentTypes | string>("");

  const { handleBack, handleNext, createFulfillment } = props;

  const handleChange = (selected: string) => {
    setChecked(selected);
  };

  const makeFulfillment = async () => {
    setLoading(true);

    const data = await createFulfillment({
      fulfillmentDetails: {
        type: checked,
        userId: user?.id as string,
        status: FulfillmentStatus.DRAFT,
      },
    });

    if (data) {
      setLoading(false);
      dispatch(
        setFulfillmentOption({
          id: data.addFulfillment._id,
          stage: FulfillmentStages.sender,
          fulfillmentType: checked as FulfillmentTypes,
        })
      );
      handleNext();
    } else setLoading(false);
  };

  useEffect(() => {
    fulfillmentType && setChecked(fulfillmentType as string);
  }, [fulfillmentType]);

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
            Fulfillment Type
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Please select your preferred shipping option
          </Typography>

          <Box
            sx={{
              marginTop: "3rem",
            }}
          >
            {fulfillmentTypes.map((type) => {
              const { name, label, description, price } = type;

              const CheckboxStyled = styled(Box)(() => ({
                padding: "20px",
                cursor: "pointer",
                borderRadius: "5px",
                marginBottom: "15px",
                "& .MuiCheckbox-root": {
                  padding: "0px",
                },
                border: `1px solid ${
                  label === checked ? theme.palette.primary.main : "#ddd"
                }`,
                color:
                  label === checked ? theme.palette.primary.dark : "#586274",
              }));

              return (
                <CheckboxStyled key={name} onClick={() => handleChange(label)}>
                  <Box
                    sx={{
                      mb: 3,
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        flexGrow: 1,
                      }}
                    >
                      <Checkbox
                        checked={checked === label}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {price}
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
              <LoadingButton
                size="large"
                loading={loading}
                variant="contained"
                disabled={!checked}
                onClick={makeFulfillment}
              >
                Next
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FulfillmentsType;
