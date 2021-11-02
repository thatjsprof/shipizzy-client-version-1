import UITable from "../../../../Components/UI/Table/Table.component";

interface Data {
  [x: string]: any;
  id?: string | number;
  reference: string;
  date: string;
  payment_mode: string;
  status: string;
  total_amount: string;
}

const data: Data[] = [
  {
    reference: "210902-829129-212121",
    total_amount: "₦40,400.00",
    date: "21/02/2021",
    payment_mode: "Bank",
    status: "Approved",
  },
  {
    reference: "210902-829129-212121",
    total_amount: "₦40,400.00",
    date: "21/02/2021",
    payment_mode: "Transfer",
    status: "Declined",
  },
  {
    reference: "210902-829129-212121",
    total_amount: "₦40,400.00",
    date: "21/02/2021",
    payment_mode: "Wallet",
    status: "Approved",
  },
  {
    reference: "210902-829129-212121",
    total_amount: "₦40,400.00",
    date: "21/02/2021",
    payment_mode: "Card",
    status: "Pending",
  },
  {
    reference: "210902-829129-212121",
    total_amount: "₦40,400.00",
    date: "21/02/2021",
    payment_mode: "Wallet",
    status: "Approved",
  },
  {
    reference: "210902-829129-212121",
    total_amount: "₦40,400.00",
    date: "21/02/2021",
    payment_mode: "Card",
    status: "Pending",
  },
];

const columns: Column[] = [
  { id: "reference", label: "Transaction Reference", minWidth: 190 },
  { id: "total_amount", label: "Total Amount", minWidth: 170 },
  {
    id: "date",
    label: "Transaction Date",
    minWidth: 170,
    align: "left",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "payment_mode",
    label: "Payment Mode",
    minWidth: 170,
    align: "left",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "left",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

const TransactionsTable = () => {
  return <UITable<Data> data={data} columns={columns}></UITable>;
};

export default TransactionsTable;
