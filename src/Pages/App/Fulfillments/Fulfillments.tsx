import Box from "@mui/material/Box";
import format from "date-fns/format";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import debounce from "lodash.debounce";
import Button from "@mui/material/Button";
import theme from "App/Layout/CustomTheme";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import { emptyResponse } from "Constants/General";
import { UppercaseTransform } from "Utils/Helpers";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Link, useNavigate } from "react-router-dom";
import {
  EFulfillmentTypes,
  FulfillmentStatus,
  FulfillmentTypes,
  IFulfillment,
} from "Interfaces/Fulfillment";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import UIAlert from "Components/UI/Alert/Alert.component";
import UIInput from "Components/UI/Input/Input.component";
import TablePagination from "@mui/material/TablePagination";
import React, { useState, useEffect, useMemo } from "react";
import UIButton from "Components/UI/Button/Button.component";
import { useAppSelector, useAppDispatch } from "Store/Hooks";
import { setFulfillmentOption } from "Store/FulfillmentSlice";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SxProps } from "@mui/material";

// const options = ["None", "Atria", "Callisto", "Dione", "Ganymede"];

const Fulfillments = ({
  loading,
  getFulfillments,
  makeSearchFulfillments,
}: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [fulfillments, setFulfillments] =
    useState<PaginatedListResponse<IFulfillment>>(emptyResponse);
  const { stage, id: fulfillmentID } = useAppSelector(
    (state) => state.fulfillment
  );
  const {
    user: { id },
  } = useAppSelector((state) => state.user);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  // const openMenu = Boolean(anchorEl);

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const openAction = Boolean(anchorEl1);

  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const onClick = () => {
    dispatch(
      setFulfillmentOption({
        stage: null,
        fulfillmentType: null,
        fulfillmentItem: null,
        fulfillmentOption: null,
        fulfillmentStatus: null,
        fulfillmentSender: null,
        fulfillmentSummary: null,
        fulfillmentReceiver: null,
        fulfillmentShipping: null,
        fulfillmentTrackingID: null,
      })
    );
  };

  const listFulfillments = async (
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

    const data = await getFulfillments(filterObject);
    setFulfillments(data?.getFulfillments ?? []);
  };

  const searchFulfillments = async (limit = rowsPerPage, page = 0) => {
    const filterObject: FilterObject = {
      searchString: search,
      userID: id as string,
      first: limit,
      page,
    };

    const data = await makeSearchFulfillments(filterObject);
    setFulfillments(data?.searchFulfillments ?? emptyResponse);
  };

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (search) {
      await searchFulfillments(rowsPerPage, newPage);
    } else {
      if (newPage > page) {
        await listFulfillments({ next: fulfillments.cursor.next as string });
      } else {
        await listFulfillments({
          previous: fulfillments.cursor.previous as string,
        });
      }
    }

    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPage(0);
    const row = parseInt(event.target.value, 10);
    setRowsPerPage(row);
    if (search) {
      await searchFulfillments(rowsPerPage, 0);
    } else {
      await listFulfillments({}, row);
    }
  };

  const skeletonText = (width = "7rem") => {
    return (
      <Skeleton
        variant="text"
        sx={{
          width,
          height: "1.64375rem",
        }}
      />
    );
  };

  const constructSkeletonText = (
    { first, second }: { first: string; second?: string },
    fulfillment?: IFulfillment
  ) => {
    return (
      <>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            letterSpacing: ".06rem",
          }}
        >
          {fulfillment ? <>{first}</> : skeletonText()}
        </Typography>
        <Typography
          sx={{
            fontSize: ".8rem",
          }}
        >
          {fulfillment ? <>{second || "-------"}</> : skeletonText("10rem")}
        </Typography>
      </>
    );
  };

  const icon = (status?: FulfillmentStatus) => {
    let sx: SxProps = {
      top: "50%",
      left: "50%",
      position: "absolute",
      transform: "translate(-50%, -50%)",
    };

    switch (status) {
      case "shipped":
        return <CheckIcon sx={sx} />;
      default:
    }

    return <DraftsIcon sx={sx} />;
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
    if (stage && fulfillmentID) {
      setOpen(true);
    }
  }, [stage, fulfillmentID]);

  useEffect(() => {
    listFulfillments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (search) searchFulfillments(rowsPerPage, 0);
    else listFulfillments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, search, rowsPerPage]);

  return (
    <Box
      sx={{
        maxWidth: "90% !important",
        margin: "3.2rem auto 0 auto",
      }}
    >
      <UIAlert
        open={open}
        closeAlert={() => setOpen(false)}
        message={
          <Box component="span">
            You have a Fulfillment you were creating. Click{" "}
            <Box
              component="span"
              onClick={() => {
                navigate("/fulfillments/new");
              }}
              sx={{
                cursor: "pointer",
                color: "primary.main",
              }}
            >
              here{" "}
            </Box>
            to continue where you left off
          </Box>
        }
      />

      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5">Your Fulfillments</Typography>
        </Box>
        <Box sx={{ justifyContent: "end" }}>
          <Link to="/fulfillments/new">
            <UIButton
              size="large"
              type="button"
              variant="contained"
              handleClick={onClick}
            >
              Create New
            </UIButton>
          </Link>
        </Box>
      </Box>
      <Box sx={{ display: "flex", mt: 6 }}>
        <UIInput
          type="text"
          size="small"
          label="Search Fulfillments"
          handleChange={debouncedSearch}
          styles={{ maxWidth: "20rem", flexGrow: 1 }}
        />
        <Box>
          <Button
            id="fade-button"
            aria-haspopup="true"
            onClick={handleClick1}
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
          <MenuItem sx={{ width: "5rem" }}>Date</MenuItem>
          <MenuItem>Status</MenuItem>
        </Menu>
      </Box>
      <Box sx={{ mt: 1 }}>
        {(loading ? Array.from(new Array(5)) : fulfillments.nodes).length >
        0 ? (
          (loading ? Array.from(new Array(5)) : fulfillments.nodes).map(
            (fulfillment?: IFulfillment, index?: number) => {
              return (
                <Box
                  key={fulfillment?._id || index}
                  sx={{
                    mb: 3,
                    cursor: "pointer",
                    borderRadius: "0.5rem",
                    backgroundColor: "#fff",
                    padding: "1rem 2rem 2rem 2rem",
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {fulfillment ? (
                      <>
                        {format(
                          new Date(fulfillment?.createdOn as Date),
                          "do 'of' MMM, yyyy"
                        )}
                      </>
                    ) : (
                      skeletonText()
                    )}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            marginRight: "10rem",
                          }}
                        >
                          <Box
                            sx={{
                              marginRight: "4rem",
                            }}
                          >
                            {fulfillment ? (
                              <Box
                                sx={{
                                  p: "2rem",
                                  borderRadius: "50%",
                                  position: "relative",
                                  color: theme.palette.success.main,
                                  backgroundColor: theme.palette.success.light,
                                }}
                              >
                                {icon(fulfillment.status)}
                              </Box>
                            ) : (
                              <Skeleton
                                width={64}
                                height={64}
                                variant="circular"
                              />
                            )}
                          </Box>
                          <Box
                            sx={{
                              flexGrow: "8",
                              display: "flex",
                              alignItems: "start",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              {constructSkeletonText(
                                {
                                  first: "Tracking ID",
                                  second: "1212-3293-0987-4834",
                                },
                                fulfillment
                              )}
                            </Box>
                            <Box>
                              {constructSkeletonText(
                                {
                                  first: "Sender",
                                  second: fulfillment?.senderAddress?.name,
                                },
                                fulfillment
                              )}
                            </Box>
                            <Box>
                              {constructSkeletonText(
                                {
                                  first: "Receiver",
                                  second: fulfillment?.receiverAddress?.name,
                                },
                                fulfillment
                              )}
                            </Box>
                            <Box>
                              {constructSkeletonText(
                                {
                                  first: "Items",
                                  second: "David Ajayi",
                                },
                                fulfillment
                              )}
                            </Box>
                            <Box>
                              {constructSkeletonText(
                                {
                                  first: "Shipping Option",
                                  second:
                                    EFulfillmentTypes[
                                      fulfillment?.type as FulfillmentTypes
                                    ],
                                },
                                fulfillment
                              )}
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            borderRadius: "2rem",
                            padding: ".5rem 2rem",
                            color: theme.palette.success.main,
                            border: `1px solid ${theme.palette.success.main}`,
                          }}
                        >
                          {UppercaseTransform(fulfillment?.status as string)}
                        </Box>
                      </Box>
                    </Box>

                    <IconButton sx={{ color: "#808080", ml: 5 }}>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Box>
                </Box>
              );
            }
          )
        ) : (
          <Box
            sx={{
              mb: 3,
              display: "flex",
              cursor: "pointer",
              minHeight: "20rem",
              alignItems: "center",
              borderRadius: "0.5rem",
              backgroundColor: "#fff",
              justifyContent: "center",
            }}
          >
            <Box sx={{ padding: "10rem", textAlign: "center" }}>
              <Box component="img" src="/images/Misc/emptyProductState.png" />
              <Typography variant="h5" sx={{ mt: 3 }}>
                No Fulfillments Found
              </Typography>
            </Box>
          </Box>
        )}
        {/* <Box
          sx={{
            mb: 3,
            cursor: "pointer",
            borderRadius: "0.5rem",
            backgroundColor: "#fff",
            padding: "1rem 2rem 2rem 2rem",
          }}
        >
          <Typography variant="body1" sx={{ mb: 3 }}>
            19<sup>th</sup> of April, 2022
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10rem",
                  }}
                >
                  <Box
                    sx={{
                      p: "2rem",
                      marginRight: "4rem",
                      borderRadius: "50%",
                      position: "relative",
                      backgroundColor: "#ffe6cc",
                      color: theme.palette.primary.main,
                    }}
                  >
                    <LocalShippingIcon
                      sx={{
                        top: "50%",
                        left: "50%",
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      flexGrow: "8",
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          letterSpacing: ".06rem",
                        }}
                      >
                        Tracking ID
                      </Typography>
                      <Typography sx={{ fontSize: ".8rem" }}>
                        1212-3293-0987-4834
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          letterSpacing: ".06rem",
                        }}
                      >
                        Sender
                      </Typography>
                      <Typography sx={{ fontSize: ".8rem" }}>
                        David Ajayi
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          letterSpacing: ".06rem",
                        }}
                      >
                        Receiver
                      </Typography>
                      <Typography sx={{ fontSize: ".8rem" }}>
                        David Ajayi
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          letterSpacing: ".06rem",
                        }}
                      >
                        Items
                      </Typography>
                      <Typography sx={{ fontSize: ".8rem" }}>
                        David Ajayi
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          letterSpacing: ".06rem",
                        }}
                      >
                        Shipping Option
                      </Typography>
                      <Typography sx={{ fontSize: ".8rem" }}>
                        David Ajayi
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    borderRadius: "2rem",
                    padding: ".5rem 2rem",
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                >
                  In Transit
                </Box>
              </Box>
            </Box>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ color: "#808080", ml: 5 }}
              aria-expanded={openMenu ? "true" : undefined}
              aria-controls={openMenu ? "long-menu" : undefined}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              open={openMenu}
              anchorEl={anchorEl}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box> */}
      </Box>
      <Box
        sx={{
          my: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {fulfillments.nodes.length > 0 ? (
          <TablePagination
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            count={fulfillments.totalCount}
            rowsPerPageOptions={[5, 10, 50, 100]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Fulfillments;
