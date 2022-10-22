import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import theme from "App/Layout/CustomTheme";
import { FulfillmentSchema } from "Schemas";
import { Categories } from "Constants/Category";
import Typography from "@mui/material/Typography";
import { NumericFormat } from "react-number-format";
import PublicIcon from "@mui/icons-material/Public";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import { EditFulfillmentResponse } from "Graphql/Responses";
import UISelect from "Components/UI/Select/Select.component";
import { useAppDispatch, useAppSelector } from "Store/Hooks";
import { setFulfillmentOption } from "Store/FulfillmentSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  IPayloadInt,
  FulfillmentItem,
  FulfillmentStages,
} from "Interfaces/Fulfillment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { UILoadingButton } from "Components/UI/Button/Button.component";
import UIOutlinedInput from "Components/UI/Input/OutlinedInput.component";

interface IProps {
  handleBack: () => void;
  handleNext: () => void;
  editFulfillment: (payload: IPayloadInt) => EditFulfillmentResponse;
}

interface FormProps {
  items: FulfillmentItem[];
}

const currencies = [
  {
    text: "USD",
    value: "usd",
  },
  {
    text: "NGN",
    value: "ngn",
  },
];

const emptyItem = {
  id: "",
  value: "",
  weight: "",
  quantity: "",
  currency: "",
  category: "",
  description: "",
};

const FulfillmentItemDescription = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const fulfillment = useAppSelector((state) => state.fulfillment);

  const { fulfillmentItem } = fulfillment;

  const {
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    mode: "onBlur",
    defaultValues: {
      items: [emptyItem],
    },
    reValidateMode: "onBlur",
    resolver: yupResolver(FulfillmentSchema.createFulfillmentItems),
  });

  const { remove, append, fields } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (payload: FormProps) => {
    setLoading(true);
    const data = await props.editFulfillment({
      id: fulfillment.id as string,
      fulfillmentDetails: {
        items: payload.items.map(
          ({ weight, quantity, id, _id, value, ...valuesRest }) => {
            return {
              ...valuesRest,
              value: +value,
              weight: +weight,
              quantity: +quantity,
            };
          }
        ),
      },
    });

    if (data?.editFulfillment?._id) {
      setLoading(false);
      dispatch(
        setFulfillmentOption({
          fulfillmentItem: payload.items,
          stage: FulfillmentStages["shipping"],
        })
      );
    } else setLoading(false);
  };

  const handleNextBack = () => {
    dispatch(
      setFulfillmentOption({
        stage: FulfillmentStages["receiver"],
      })
    );
  };

  const getRegister = (index: number) => {
    return (value: keyof FulfillmentItem) => {
      const { ref, ...rest } = register(`items.${index}.${value}`);
      const error = errors?.items?.[index]?.[value];

      return {
        ref,
        error: !!error,
        rest: { ...rest },
        errMessage: error?.message,
        name: `items.${index}.weight`,
      };
    };
  };

  React.useEffect(() => {
    if ((fulfillmentItem || []).length > 0) {
      setValue("items", fulfillmentItem as FulfillmentItem[]);
    } else {
      setValue("items", [emptyItem]);
    }
  }, [fulfillmentItem, setValue]);

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
          noValidate
          component="form"
          sx={{
            width: "50rem",
          }}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              marginTop: "2rem",
              letterSpacing: "1px",
            }}
          >
            Detailed Item Desciption
          </Typography>
          <Typography
            sx={{
              mt: 1,
            }}
          >
            Please enter information about the items you want to ship
          </Typography>

          <Box
            sx={{
              marginTop: "3rem",
            }}
          >
            {fields.map((field, index) => {
              const items = `items.${index}`;

              const registerValue = getRegister(index);
              const valueProps = registerValue("value");
              const weightProps = registerValue("weight");
              const quantityProps = registerValue("quantity");
              const categoryProps = registerValue("category");
              const currencyProps = registerValue("currency");
              const descriptionProps = registerValue("description");

              return (
                <Box key={field.id}>
                  {fields.length > 1 && (
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          flexGrow: 1,
                        }}
                      >
                        Item {index + 1}
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          color: "#586274",
                          cursor: "pointer",
                          justifyContent: "flex-end",
                        }}
                        onClick={() => remove(index)}
                      >
                        <HighlightOffIcon
                          sx={{
                            mr: 2,
                            color: theme.palette.primary.main,
                          }}
                        />
                        <Box component="span">Remove Item</Box>
                      </Typography>
                    </Box>
                  )}
                  <Box
                    sx={{
                      border: 0,
                    }}
                    name={items}
                    component="fieldset"
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <UISelect
                          options={Categories}
                          label="Item Category"
                          {...categoryProps.rest}
                          refs={categoryProps.ref}
                          error={categoryProps.error}
                          value={watch(`items.${index}.category`)}
                          startAdornment={
                            <PublicIcon sx={{ mr: 2, color: "#586274" }} />
                          }
                        />
                        {categoryProps.error && (
                          <span className="v-error">
                            {categoryProps.errMessage}
                          </span>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <UIOutlinedInput
                          type="text"
                          variant="outlined"
                          label="Item Description"
                          startAdornment={
                            <AccountCircleIcon
                              sx={{
                                mr: 2,
                                color: "#586274",
                              }}
                            />
                          }
                          {...descriptionProps.rest}
                          refs={descriptionProps.ref}
                          error={descriptionProps.error}
                        />
                        {descriptionProps.error && (
                          <span className="v-error">
                            {descriptionProps.errMessage}
                          </span>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <NumericFormat
                          type="text"
                          variant="outlined"
                          displayType="input"
                          decimalSeparator="."
                          startAdornment={
                            <AccountCircleIcon
                              sx={{
                                mr: 2,
                                color: "#586274",
                              }}
                            />
                          }
                          allowNegative={false}
                          label="Item Quantity"
                          thousandSeparator=","
                          value={field.quantity}
                          onValueChange={(values) => {
                            setValue(
                              `items.${index}.quantity`,
                              Number(values.floatValue)
                            );
                          }}
                          error={quantityProps.error}
                          customInput={UIOutlinedInput}
                          name={quantityProps.rest.name}
                          onBlur={quantityProps.rest.onBlur}
                        />
                        {quantityProps.error && (
                          <span className="v-error">
                            {quantityProps.errMessage}
                          </span>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <NumericFormat
                          type="text"
                          variant="outlined"
                          displayType="input"
                          decimalSeparator="."
                          startAdornment={
                            <AccountCircleIcon
                              sx={{
                                mr: 2,
                                color: "#586274",
                              }}
                            />
                          }
                          value={field.weight}
                          allowNegative={false}
                          thousandSeparator=","
                          label="Item Weight (KG)"
                          onValueChange={(values) => {
                            setValue(
                              `items.${index}.weight`,
                              Number(values.floatValue)
                            );
                          }}
                          error={weightProps.error}
                          name={weightProps.rest.name}
                          customInput={UIOutlinedInput}
                          onBlur={weightProps.rest.onBlur}
                        />
                        {weightProps.error && (
                          <span className="v-error">
                            {weightProps.errMessage}
                          </span>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <UISelect
                          label="Currency"
                          options={currencies}
                          {...currencyProps.rest}
                          refs={currencyProps.ref}
                          error={currencyProps.error}
                          value={watch(`items.${index}.currency`)}
                          startAdornment={
                            <PublicIcon sx={{ mr: 2, color: "#586274" }} />
                          }
                        />
                        {currencyProps.error && (
                          <span className="v-error">
                            {currencyProps.errMessage}
                          </span>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <NumericFormat
                          type="text"
                          variant="outlined"
                          label="Item Value"
                          displayType="input"
                          decimalSeparator="."
                          startAdornment={
                            <AccountCircleIcon
                              sx={{
                                mr: 2,
                                color: "#586274",
                              }}
                            />
                          }
                          value={field.value}
                          allowNegative={false}
                          thousandSeparator=","
                          onValueChange={(values) => {
                            setValue(
                              `items.${index}.value`,
                              Number(values.floatValue)
                            );
                          }}
                          error={valueProps.error}
                          name={valueProps.rest.name}
                          customInput={UIOutlinedInput}
                          onBlur={valueProps.rest.onBlur}
                        />
                        {valueProps.error && (
                          <span className="v-error">
                            {valueProps.errMessage}
                          </span>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              );
            })}

            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  mt: 2,
                  flexGrow: 1,
                  display: "flex",
                  color: "#586274",
                  cursor: "pointer",
                }}
                onClick={() => append(emptyItem)}
              >
                <AddCircleOutlineIcon
                  sx={{
                    mr: 2,
                    color: theme.palette.primary.main,
                  }}
                />
                <Box component="span">Add Another Item</Box>
              </Typography>
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
                <Button
                  onClick={handleNextBack}
                  size="large"
                  variant="outlined"
                >
                  Back
                </Button>
              </Box>
              <UILoadingButton
                type="submit"
                size="large"
                loading={loading}
                variant="contained"
                disabled={!isValid}
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

export default FulfillmentItemDescription;
