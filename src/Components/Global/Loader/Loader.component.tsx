import React from "react";
import { makeStyles } from "@mui/styles";
import theme from "App/Layout/CustomTheme";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface LoaderProps {
  show: boolean;
  text: string;
}

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    position: "relative",
  },
  backdrop: {
    display: "flex",
    flexDirection: "column",
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white !important",
  },
});

const Loader = ({ show, text }: LoaderProps) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={show}>
      <h2 className="loader-font" style={{ marginBottom: 10 }}>
        {text}
      </h2>
      <div className={classes.root}>
        <CircularProgress size={60} thickness={4} />
      </div>
    </Backdrop>
  );
};

export default Loader;
