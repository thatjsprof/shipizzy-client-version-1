import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import styles from "./Table.module.scss";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import Backdrop from "@mui/material/Backdrop";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";

interface BaseData {
  [x: string]: any;
  id?: string | number;
}

interface UITableProps<Data> {
  data: Data[];
  page?: number;
  loading?: boolean;
  totalRows?: number;
  minHeight?: number;
  maxHeight?: number;
  rowsPerPage?: number;
  columns: readonly Column[];
  paginationOptions?: number[];
  handleChangePage?: (page: number) => void;
  handleChangeRowsPerPage?: (rowsPerPage: number) => void;
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
  page = 0,
  maxHeight,
  loading = false,
  minHeight = 200,
  rowsPerPage = 5,
  paginationOptions,
  totalRows: tRows = 0,
  handleChangePage: handlePChange,
  handleChangeRowsPerPage: handleRChange,
}: UITableProps<Data>) {
  const [totalRows, setTotalRows] = React.useState<number>(0);
  const [tableData, setTableData] = React.useState<Data[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    handlePChange && handlePChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleRChange && handleRChange(+event.target.value);
  };

  // Perform updates to data if needed
  function createData({ ...data }: Data): Data {
    return data;
  }

  const validData = (data: Data[]) =>
    data.map((data) => {
      return createData({ ...data });
    });

  React.useEffect(() => {
    setTableData(data);
    setTotalRows(tRows);
  }, [data, tRows]);

  // console.log("data from table component", data);

  return (
    <Paper
      sx={{
        minHeight,
        width: "100%",
        border: "none",
        boxShadow: "none",
        overflow: "hidden",
        position: "relative !important",
      }}
    >
      <Backdrop
        open={loading}
        sx={{
          top: 0,
          zIndex: 10,
          position: "absolute",
          backgroundColor: "rgba(230, 230, 230, 0.2)",
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Backdrop>
      <TableContainer className={styles.table} sx={{ maxHeight, minHeight }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className={styles.table__cell}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {validData(tableData).map((row) => {
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
                        {column.format ? column.format(value) : value}
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
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={paginationOptions}
        onRowsPerPageChange={handleChangeRowsPerPage}
        count={totalRows || validData(tableData).length}
      />
    </Paper>
  );
}

export default UITable;
