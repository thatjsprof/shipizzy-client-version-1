import { Address, IAddressType } from "Interfaces/Address";

export const shippingData = [
  {
    price: "14211",
    label: "express",
    name: "Express Shipping",
    description: "Delivery in 3 - 5 days",
  },
  {
    price: "3000",
    label: "basic",
    name: "Basic Shipping (Cargo)",
    description: "Delivery in 7 - 14 days",
    note: "Please note that shipments below 30,000 would not apply",
  },
];

export const insuranceData = [
  {
    price: "Free",
    label: "basic",
    name: "Basic Insurance",
    description: "Covers damage up to N5,000",
  },
  {
    price: "3000",
    label: "premium",
    name: "Premium Insurance",
    description: "Covers damage up to N50,000",
  },
];

export const fulfillmentTypes = [
  {
    price: "Free",
    name: "Drop-off",
    label: "dropOff",
    description:
      "Drop off your items at the nearest Shipizzy fulfillment center",
  },
  {
    label: "pickUp",
    price: "N500 / Free",
    name: "Request a Pick-up",
    description:
      "Pick up within Lagos is free. A dispatch rider will pick up your items at your preferred location",
  },
];

export const emptyAddress: (type: IAddressType) => Address = (
  type: IAddressType
) => ({
  addressType: type,
  _id: "",
  name: "",
  city: "",
  email: "",
  state: "",
  country: "",
  postalCode: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  additionalInfo: "",
});
