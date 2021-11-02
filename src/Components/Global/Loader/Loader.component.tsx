import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import theme from "../../../App/Layout/CustomTheme";
import { makeStyles } from "@mui/styles";

interface LoaderProps {
  show: boolean;
  text: string
}

const useStyles = makeStyles({
  root: {
    position: "relative",
    marginTop: "10px",
  },
  backdrop: {
    backgroundColor: "white !important",
    display: "flex",
    flexDirection: "column",
    zIndex: theme.zIndex.drawer + 1,
  },
});

const Loader = ({ show, text }: LoaderProps) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={show}>
      <h2 className="loader-font">{text}</h2>
      <div className={classes.root}>
        <CircularProgress
          size={60}
          thickness={4}
        />
      </div>
    </Backdrop>
  );
};

export default Loader;
