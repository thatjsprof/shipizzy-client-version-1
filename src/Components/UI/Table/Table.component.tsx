import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import styles from "./Table.module.scss";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

interface BaseData {
  [x: string]: any;
  id?: string | number;
}

interface UITableProps<Data> {
  data: Data[];
  maxHeight?: number;
  columns: readonly Column[];
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f1f1f3",
  },
  "& td, & th": {
    border: 0,
  },
}));

function UITable<Data extends BaseData>({
  data,
  columns,
  maxHeight = 500,
}: UITableProps<Data>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function createData({ ...data }: Data): Data {
    return data;
  }

  const rows = data.map((data) => {
    return createData({ ...data });
  });

  return (
    <Paper
      sx={{
        width: "100%",
        border: "none",
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      <TableContainer className={styles.table} sx={{ maxHeight: maxHeight }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={styles.table__cell}
                >
                  {column.label}
                </TableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow
                    hover
                    key={row.id}
                    tabIndex={-1}
                    role="checkbox"
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={styles.table__cell}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10, 25, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default UITable;
