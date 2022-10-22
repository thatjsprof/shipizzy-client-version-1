import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import debounce from "lodash.debounce";
import Button from "@mui/material/Button";
import theme from "App/Layout/CustomTheme";
import { useAppSelector } from "Store/Hooks";
import MenuItem from "@mui/material/MenuItem";
import { Data } from "Interfaces/Transaction";
import styles from "./Transactions.module.scss";
import { columns } from "./Transactions.helper";
import { emptyResponse } from "Constants/General";
import Typography from "@mui/material/Typography";
import UIInput from "Components/UI/Input/Input.component";
import UITable from "Components/UI/Table/Table.component";
import React, { useEffect, useState, useMemo } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  loading: boolean;
  makeGetTransactions: (payload: { userID: string }) => Promise<any>;
  makeSearchTransaction: (payload: { userID: string }) => Promise<any>;
}

const Transactions = ({
  loading,
  makeGetTransactions,
  makeSearchTransaction,
}: Props) => {
  const [tableData, setTableData] =
    useState<PaginatedListResponse<Data>>(emptyResponse);
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openAction = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const paginationOptions = [5, 10, 20, 50];
  const {
    user: { id },
  } = useAppSelector((state) => state.user);

  const handlePageChange = async (newPage: number) => {
    if (search) {
      await searchTransactions(rowsPerPage, newPage);
    } else {
      if (newPage > page) {
        await listTransactions({ next: tableData.cursor.next as string });
      } else {
        await listTransactions({
          previous: tableData.cursor.previous as string,
        });
      }
    }

    setPage(newPage);
  };

  const handleRowsPerPageChange = async (rowsPerPage: number) => {
    setPage(0);
    setRowsPerPage(rowsPerPage);
    if (search) {
      await searchTransactions(rowsPerPage, 0);
    } else {
      await listTransactions({}, rowsPerPage);
    }
  };

  const listTransactions = async (
    filterPrams?: FilterParams,
    limit = rowsPerPage
  ) => {
    const next = filterPrams?.next;
    const previous = filterPrams?.previous;

    const filterObject: FilterObject = {
      first: limit,
      userID: id as string,
    };

    if (next) {
      filterObject["next"] = next;
    }

    if (previous) {
      filterObject["previous"] = previous;
    }

    const data = await makeGetTransactions(filterObject);
    setTableData(data?.getTransactions ?? emptyResponse);
  };

  const searchTransactions = async (limit = rowsPerPage, page = 0) => {
    const filterObject: FilterObject = {
      searchString: search,
      userID: id as string,
      first: limit,
      page,
    };

    const data = await makeSearchTransaction(filterObject);
    setTableData(data?.searchTransactions ?? emptyResponse);
  };

  const changeSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const debouncedSearch = useMemo(() => {
    return debounce(changeSearchTerm, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  });

  useEffect(() => {
    listTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (search) searchTransactions(rowsPerPage, 0);
    else listTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, search, rowsPerPage]);

  return (
    <Box>
      <Box className={styles.transactions}>
        <Typography
          variant="h5"
          sx={{
            mb: 1,
            fontWeight: "normal",
          }}
        >
          Your Transactions
        </Typography>
        <Box
          sx={{
            mt: 6,
            display: "flex",
          }}
        >
          <UIInput
            type="text"
            size="small"
            label="Search Transactions"
            handleChange={debouncedSearch}
            styles={{ maxWidth: "20rem", flexGrow: 1 }}
          />
          <Box>
            <Button
              id="fade-button"
              aria-haspopup="true"
              onClick={handleClick}
              aria-controls="fade-menu"
              aria-expanded={openAction ? "true" : undefined}
              sx={{
                height: "2.5rem",
                border: `.1rem solid ${theme.palette.primary.main}`,
              }}
            >
              Filters <KeyboardArrowDownIcon />
            </Button>
          </Box>
          <Menu
            id="fade-menu"
            open={openAction}
            anchorEl={anchorEl}
            TransitionComponent={Fade}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
          >
            <MenuItem
              sx={{
                width: "5rem",
              }}
            >
              Date
            </MenuItem>
            <MenuItem>Status</MenuItem>
          </Menu>
        </Box>
        <Box sx={{ mt: 2 }}>
          <UITable<Data>
            page={page}
            columns={columns}
            loading={loading}
            data={tableData.nodes.map(({ _id, ...valRest }) => {
              return {
                ...valRest,
                id: _id,
              };
            })}
            rowsPerPage={rowsPerPage}
            totalRows={tableData.totalCount}
            handleChangePage={handlePageChange}
            paginationOptions={paginationOptions}
            handleChangeRowsPerPage={handleRowsPerPageChange}
          />
        </Box>
        <Typography
          sx={{
            my: 5,
          }}
        >
          <span
            style={{
              color: theme.palette.primary.main,
            }}
          >
            Note:{" "}
          </span>
          This table shows all transactions captured by Shipizzy.
        </Typography>
      </Box>
    </Box>
  );
};

export default Transactions;
