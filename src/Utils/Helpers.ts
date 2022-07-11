import moment from "moment-timezone";

export const UppercaseTransform = (value: string) => {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
};

export const formatToNGN = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
  currencyDisplay: "symbol",
});

export const setDateToGmt = (date: Date | string) =>
  moment(date).tz("GMT + 1").format("DD-MM-YYYY");

export type Modify<T, R> = Omit<T, keyof R> & R;
