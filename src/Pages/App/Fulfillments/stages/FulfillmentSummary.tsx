import React from "react";
import {
  FulfillmentTypes,
  EFulfillmentTypes,
  FulfillmentStages,
} from "Interfaces/Fulfillment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import theme from "App/Layout/CustomTheme";
import { regExp } from "Constants/General";
import Typography from "@mui/material/Typography";
import { UppercaseTransform } from "Utils/Helpers";
import { useAppDispatch, useAppSelector } from "Store/Hooks";
import { setFulfillmentOption } from "Store/FulfillmentSlice";
import { UILoadingButton } from "Components/UI/Button/Button.component";

interface IProps {
  handleBack: () => void;
  handleNext: () => void;
  handleSelect: (index: number) => void;
}

const FulfillmentSummary = (props: IProps) => {
  const dispatch = useAppDispatch();
  const {
    fulfillmentItem,
    fulfillmentType,
    fulfillmentSender,
    fulfillmentOption,
    fulfillmentReceiver,
  } = useAppSelector((state) => state.fulfillment);

  const handleNextChange = () => {
    dispatch(
      setFulfillmentOption({
        stage: FulfillmentStages["payment"],
      })
    );
  };

  const handleNextBack = () => {
    dispatch(
      setFulfillmentOption({
        stage: FulfillmentStages["item"],
      })
    );
  };

  const Section = (props: {
    title: string;
    children: React.ReactNode;
    editInfo: { name?: string; stage: FulfillmentStages };
  }) => {
    const { children, title, editInfo } = props;

    const { stage } = editInfo;

    return (
      <Box
        sx={{
          marginTop: "2.5rem",
        }}
      >
        <Typography
          sx={{
            mb: 1,
            color: theme.palette.primary.dark,
          }}
        >
          {title}
        </Typography>
        <Box>{children}</Box>
        <Typography
          sx={{
            mt: 2,
            color: "#003060",
            cursor: "pointer",
          }}
          onClick={() => {
            dispatch(
              setFulfillmentOption({
                stage,
              })
            );
          }}
        >
          {editInfo?.name || "Edit Information"}
        </Typography>
      </Box>
    );
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
            Order Summary
          </Typography>
          <Typography
            sx={{
              mt: 1,
            }}
          >
            Confirm your order information
          </Typography>

          <Box component="form">
            <Section
              title="Shipment Information"
              editInfo={{ stage: FulfillmentStages.shipping }}
            >
              <Box
                sx={{
                  display: "flex",
                  columnGap: "5rem",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Shipping Option
                  </Typography>
                  <Typography>
                    {UppercaseTransform(fulfillmentOption as string)}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Shipping Type
                  </Typography>
                  <Typography>
                    {EFulfillmentTypes[fulfillmentType as FulfillmentTypes]}
                  </Typography>
                </Box>
              </Box>
            </Section>
            <Section
              title="Sender"
              editInfo={{ stage: FulfillmentStages.sender }}
            >
              <Typography>{fulfillmentSender?.name}</Typography>
              <Typography>{`${fulfillmentSender?.addressLine1}, ${
                fulfillmentSender?.city
              }, ${fulfillmentSender?.state
                .replace(regExp, "")
                .trim()}, ${fulfillmentSender?.country
                .replace(regExp, "")
                .trim()}`}</Typography>
              <Typography>{fulfillmentSender?.email}</Typography>
              <Typography>{fulfillmentSender?.phoneNumber}</Typography>
            </Section>
            <Section
              title="Receiver"
              editInfo={{ stage: FulfillmentStages.receiver }}
            >
              <Typography>{fulfillmentReceiver?.name}</Typography>
              <Typography>{`${fulfillmentReceiver?.addressLine1}, ${
                fulfillmentReceiver?.city
              }, ${fulfillmentReceiver?.state
                .replace(regExp, "")
                .trim()}, ${fulfillmentReceiver?.country
                .replace(regExp, "")
                .trim()}`}</Typography>
              <Typography>{fulfillmentReceiver?.email}</Typography>
              <Typography>{fulfillmentReceiver?.phoneNumber}</Typography>
            </Section>
            <Section title="Items" editInfo={{ stage: FulfillmentStages.item }}>
              <Box>
                {fulfillmentItem &&
                  fulfillmentItem.map((item, index) => {
                    return (
                      <Box
                        key={item.id}
                        sx={{
                          "&:not(:first-of-type)": {
                            marginTop: "15px",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            mt: 1,
                            mb: 1,
                            fontWeight: "bold",
                          }}
                        >
                          Item {index + 1}
                        </Typography>
                        <Typography>
                          Description:{" "}
                          <Box
                            component="span"
                            sx={{
                              fontStyle: "italic",
                            }}
                          >
                            {item.description}
                          </Box>
                        </Typography>
                        <Typography>
                          Category:{" "}
                          <Box
                            component="span"
                            sx={{
                              fontStyle: "italic",
                            }}
                          >
                            {item.category}
                          </Box>
                        </Typography>
                        <Typography>
                          Value:{" "}
                          <Box
                            component="span"
                            sx={{
                              fontStyle: "italic",
                            }}
                          >
                            {`${item.currency.toUpperCase()} ${item.value}`}
                          </Box>
                        </Typography>
                        <Typography>
                          Quantity:{" "}
                          <Box
                            component="span"
                            sx={{
                              fontStyle: "italic",
                            }}
                          >
                            {item.quantity}
                          </Box>
                        </Typography>
                        <Typography>
                          Weight:{" "}
                          <Box
                            component="span"
                            sx={{
                              fontStyle: "italic",
                            }}
                          >
                            {item.weight} KG
                          </Box>
                        </Typography>
                      </Box>
                    );
                  })}
              </Box>
            </Section>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginTop: "55px",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Button onClick={handleNextBack} size="large" variant="outlined">
                Back
              </Button>
            </Box>
            <UILoadingButton
              size="large"
              type="button"
              variant="contained"
              handleClick={handleNextChange}
            >
              Proceed to Payment
            </UILoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FulfillmentSummary;
