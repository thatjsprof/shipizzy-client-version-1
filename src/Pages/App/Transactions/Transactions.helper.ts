import { formatDate, formatNumber, UppercaseTransform } from "Utils/Helpers";

export const columns: Column[] = [
  { id: "reference", label: "Transaction Reference", minWidth: 250 },
  {
    id: "totalAmount",
    label: "Total Amount",
    minWidth: 170,
    format: (value: string | number) => formatNumber().format(+value),
  },
  {
    minWidth: 170,
    align: "left",
    id: "transactionDate",
    label: "Transaction Date",
    format: (value: string | number) => formatDate(value),
  },
  {
    minWidth: 170,
    align: "left",
    id: "paymentMode",
    label: "Payment Mode",
    format: (value: string | number) =>
      UppercaseTransform(value.toLocaleString("en-US")),
  },
  {
    id: "status",
    minWidth: 100,
    align: "left",
    label: "Status",
    format: (value: string | number) =>
      UppercaseTransform(value.toLocaleString("en-US")),
  },
];
