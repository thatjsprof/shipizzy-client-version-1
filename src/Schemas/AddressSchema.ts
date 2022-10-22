import * as Yup from "yup";
import "yup-phone";

export const CreateAddress = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string()
    .phone("", false, "Phone Number must be a valid one")
    .required("Phone Number is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().when("country", (country, schema) =>
    country ? schema.required("State is required") : schema
  ),
  city: Yup.string().when("state", (state, schema) =>
    state ? schema.required("City is required") : schema
  ),
  postalCode: Yup.string().required("Postal Code is required"),
  addressLine1: Yup.string().required("Address Line 1 is required"),
  addressType: Yup.string().required("Address Type is required"),
});
