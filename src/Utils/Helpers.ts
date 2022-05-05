export const UppercaseTransform = (value: string) => {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
};

export const formatToNGN = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
  currencyDisplay: "symbol",
});
