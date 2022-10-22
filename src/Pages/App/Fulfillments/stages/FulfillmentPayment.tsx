import React from "react";
import {
  CreatePaymentResponse,
  EditFulfillmentResponse,
  VerifyPaymentResponse,
} from "Graphql/Responses";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import theme from "App/Layout/CustomTheme";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import { IError } from "Utils/GraphqlRequest";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { usePaystackPayment } from "react-paystack";
import { useAppDispatch, useAppSelector } from "Store/Hooks";
import { FulfillmentStages, IPayloadInt } from "Interfaces/Fulfillment";
import { IPayloadValue, IVerifyPayloadValue } from "Interfaces/Payment";
import { UILoadingButton } from "Components/UI/Button/Button.component";
import { setFulfillmentOption, initialState } from "Store/FulfillmentSlice";

type VerifyPaymentFunc = (payload: IVerifyPayloadValue) => Promise<{
  data: VerifyPaymentResponse;
  error: IError | null;
}>;

interface IProps {
  handleBack: () => void;
  verifyPayment: VerifyPaymentFunc;
  createPayment?: (payload: IPayloadValue) => CreatePaymentResponse;
  editFulfillment: (payload: IPayloadInt) => EditFulfillmentResponse;
  addTransaction: (payload: { transactionDetails: any }) => Promise<any>;
}

interface IConfig {
  email: string;
  amount: number;
}

const paymentOptions = [
  {
    name: "Paystack",
    desc: "Terms and Conditions apply",
  },
  {
    disabled: true,
    name: "Flutterwave",
    desc: "Make Payment Now",
  },
];

const CheckboxStyled = styled(Box)<{
  state: {
    label: string;
    checked: string;
    disabled?: boolean;
  };
}>(({ state: { label, checked, disabled = false } }) => ({
  "& .MuiCheckbox-root": {
    padding: "0px",
  },
  padding: "20px",
  borderRadius: "5px",
  marginBottom: "15px",
  cursor: disabled ? "none" : "pointer",
  border: `1px solid ${
    label === checked ? theme.palette.primary.main : "#ddd"
  }`,
  color: label === checked ? theme.palette.primary.dark : "#586274",
}));

const configObject = ({ email, amount }: IConfig) => ({
  email,
  amount,
  reference: uuidv4(),
  publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY as string,
});

const FulfillmentsPayment = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [amount] = React.useState<number>(10000);
  const [paymentMethod, setPaymentMethod] = React.useState(
    paymentOptions[0].name
  );
  const initializePayment = usePaystackPayment(
    configObject({ email: user.email as string, amount })
  );

  const onSuccess = ({ reference }: { reference: string }) => {
    console.log(reference);
    props
      .verifyPayment({
        verifyPayload: { reference },
      })
      .then(({ data, error }) => {
        if (error?.errors && error?.errors.length > 0) {
          dispatch(
            setFulfillmentOption({
              stage: FulfillmentStages.status,
              fulfillmentPaymentInformation: {
                amount,
                reference,
                status: "failed",
              },
            })
          );
        } else {
          const {
            verifyPayment: {
              id,
              amount,
              status,
              paid_at,
              channel,
              reference,
              created_at,
            },
          } = data;

          props
            .addTransaction({
              transactionDetails: {
                status,
                reference,
                userID: user.id,
                totalAmount: amount,
                paymentMode: channel,
                transactionDate: paid_at,
              },
            })
            .then((result) => {
              console.log(result);
            });

          dispatch(
            setFulfillmentOption({
              ...initialState,
              stage: FulfillmentStages.status,
              fulfillmentPaymentInformation: {
                id,
                amount,
                status,
                paid_at,
                channel,
                reference,
                created_at,
              },
            })
          );
        }
      });

    setLoading(false);
  };

  const onClose = () => {
    setLoading(false);
  };

  const handleNextBack = () => {
    dispatch(
      setFulfillmentOption({
        stage: FulfillmentStages["summary"],
      })
    );
  };

  const handleChangeMethod = (value: string) => {
    setPaymentMethod(value);
  };

  const handlePayment = async () => {
    setLoading(true);
    initializePayment(onSuccess as () => void, onClose);
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
            Pay for your Fulfillment
          </Typography>

          <Grid
            container
            // spacing={2}
            sx={{
              mt: 4,
              "& .MuiGrid-item": {
                paddingTop: "0px",
              },
            }}
          >
            <Grid xs={12} item>
              <Typography sx={{ mb: 2 }}>Payment Breakdown:</Typography>

              <Card
                sx={{
                  width: "100%",
                  textAlign: "left",
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Typography>
                    <Box component="b" sx={{ mr: 1 }}>
                      Shipping Fee:
                    </Box>
                    $10,000
                  </Typography>
                  <Typography>
                    <Box component="b" sx={{ mr: 1 }}>
                      Custom & Duty:
                    </Box>
                    $4,000
                  </Typography>
                  <Typography>
                    <Box component="b"></Box>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              mt: 4,
            }}
          >
            <Grid item xs={12}>
              <Typography sx={{ mt: 1, mb: 1 }}>
                Please select your preferred payment option
              </Typography>
            </Grid>

            {paymentOptions.map(({ name, desc, disabled }) => (
              <Grid key={name} item xs={6}>
                <CheckboxStyled
                  key={name}
                  state={{ label: name, checked: paymentMethod }}
                  onClick={() => (disabled ? null : handleChangeMethod(name))}
                >
                  <Box
                    sx={{
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        flexGrow: 1,
                        fontSize: "1.5rem",
                        color: disabled ? "#bfbfbf" : "inherit",
                      }}
                    >
                      {name}
                    </Typography>
                    <Box>
                      <Checkbox
                        disabled={disabled}
                        checked={paymentMethod === name}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Box>
                  </Box>
                </CheckboxStyled>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              my: 5,
              display: "flex",
            }}
          >
            <Box sx={{ flexGrow: 1 }}></Box>
            <UILoadingButton
              size="large"
              type="button"
              loading={loading}
              variant="contained"
              disabled={!paymentMethod}
              handleClick={handlePayment}
            >
              Pay Now
            </UILoadingButton>
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
              <Button onClick={handleNextBack} size="large" variant="outlined">
                Back
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FulfillmentsPayment;
