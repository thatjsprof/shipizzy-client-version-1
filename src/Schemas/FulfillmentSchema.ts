import * as Yup from "yup";
import "yup-phone";

export const CreateFulfillment = Yup.object().shape({});

export const createFulfillmentItems = Yup.object().shape({
  items: Yup.array(
    Yup.object({
      value: Yup.string().required("Value is required"),
      weight: Yup.string().required("Weight is required"),
      quantity: Yup.string().required("Quantity is required"),
      category: Yup.string().required("Category is required"),
      currency: Yup.string().required("Currency is required"),
      description: Yup.string().required("Description is required"),
    })
  ),
});
