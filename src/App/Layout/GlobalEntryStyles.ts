import theme from "./CustomTheme";

const GlobalStyles = {
  "*": {
    margin: 0,
    padding: 0,
  },
  body: {
    fontFamily: ["PT Sans", "sans-serif"].join(","),
    backgroundColor: "#f6f6f7",
  },
  ".v-error": {
    color: theme.palette.error.main,
    display: "block",
    margin: "-10px 0px 20px 0px",
    fontSize: "12px",
    fontStyle: "italic",
  },
  a: {
    textDecoration: "none",
    color: "inherit",
  },
  ".activeItem": {
    backgroundColor: "red",
  },
};

export default GlobalStyles;
