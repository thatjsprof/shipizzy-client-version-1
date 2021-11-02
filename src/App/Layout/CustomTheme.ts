import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

let theme = createTheme({
  status: {
    danger: orange[500],
  },
  palette: {
    primary: {
      light: "#f2bd61",
      main: "#ffa64d",
    },
    secondary: {
      light: "#595fe3",
      main: "#5158db",
    },
  },
  typography: {
    fontFamily: ["PT Sans", "sans-serif"].join(","),
    button: {
      textTransform: "capitalize",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
