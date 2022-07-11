import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import theme from "App/Layout/CustomTheme";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UIAlert from "Components/UI/Alert/Alert.component";
import UIInput from "Components/UI/Input/Input.component";
import UIButton from "Components/UI/Button/Button.component";
import { useAppSelector, useAppDispatch } from "Store/Hooks";
import { setFulfillmentOption } from "Store/FulfillmentSlice";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const options = ["None", "Atria", "Callisto", "Dione", "Ganymede"];

const Fulfillments = ({ loading, getFulfillments }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [fulfillments, setFulfillments] = useState<any>([]);
  const { stage } = useAppSelector((state) => state.fulfillment);
  const {
    user: { id },
  } = useAppSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const openAction = Boolean(anchorEl1);
  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = () => {
    dispatch(
      setFulfillmentOption({
        stage: null,
        option: null,
      })
    );
  };

  useEffect(() => {
    if (stage) {
      setOpen(true);
    }
  }, [stage]);

  useEffect(() => {
    const listFulfillments = async () => {
      const data = await getFulfillments({
        userID: id,
      });

      console.log(data);

      setFulfillments(data.getFulfillments);
    };

    listFulfillments();
  }, [id]);

  console.log(fulfillments, loading);

  return (
    <Box sx={{ maxWidth: "90% !important", margin: "3.2rem auto 0 auto" }}>
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
              sx={{ color: "primary.main", cursor: "pointer" }}
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
        <Box
          sx={{
            mb: 3,
            cursor: "pointer",
            borderRadius: "0.5rem",
            backgroundColor: "#fff",
            padding: "1rem 2rem 2rem 2rem",
          }}
        >
          <Typography variant="body1" sx={{ mb: 3 }}>
            27<sup>th</sup> of May, 2022
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
                      color: theme.palette.success.main,
                      backgroundColor: theme.palette.success.light,
                    }}
                  >
                    <CheckIcon
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
                    color: theme.palette.success.main,
                    border: `1px solid ${theme.palette.success.main}`,
                  }}
                >
                  Shipped
                </Box>
              </Box>
            </Box>

            <IconButton sx={{ color: "#808080", ml: 5 }}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
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
        </Box>
      </Box>
    </Box>
  );
};

export default Fulfillments;
