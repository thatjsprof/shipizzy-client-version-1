import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UIInput from "../Components/UI/Input/Input.component";
import UISelect from "../Components/UI/Select/Select.component";
import UITable from "../Components/UI/Table/Table.component";
import Divider from "@mui/material/Divider";

const options = [
  {
    value: 1,
    text: "One",
  },
  {
    value: 2,
    text: "Two",
  },
];

interface Data {
  [x: string]: string | number;
  id: string | number;
  name: string;
  age: number;
}

const data = [
  { id: 1, age: 2, name: "David" },
  { id: 1, age: 2, name: "David" },
  { id: 1, age: 2, name: "David" },
  { id: 1, age: 2, name: "David" },
];

const columns: Column[] = [
  { id: "id", label: "Name", minWidth: 170 },
  {
    id: "age",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "name",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    // align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  }
];

const ComponentsPage = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        Global Components
      </Typography>
      <Divider></Divider>
      <Box width={3 / 4} sx={{ m: "auto" }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ my: 3 }}>
            Input Component
          </Typography>
          <UIInput type="text"></UIInput>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ my: 3 }}>
            Select Component
          </Typography>
          <UISelect emptyValue options={options}></UISelect>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ my: 3 }}>
            Table Component
          </Typography>
          <UITable<Data> data={data} columns={columns}></UITable>
        </Box>
      </Box>
    </Container>
  );
};

export default ComponentsPage;
