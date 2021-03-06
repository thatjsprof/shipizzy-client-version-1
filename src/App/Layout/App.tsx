import routes from "./Routes";
import Theme from "./CustomTheme";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import { useAppSelector } from "Store/Hooks";
import { ThemeProvider } from "@mui/material";
import GlobalEntryStyles from "./GlobalEntryStyles";
import GlobalStyles from "@mui/material/GlobalStyles";
import Loader from "../../Components/Global/Loader/Loader.component";
import ErrorBoundary from "../../Components/Errors/ErrorBoundary/ErrorBoundary.component";

const inputGlobalStyles = <GlobalStyles styles={GlobalEntryStyles} />;

const App = () => {
  const content = useRoutes(routes);
  const { isInitialized } = useAppSelector((state) => state.user);

  return (
    <ThemeProvider theme={Theme}>
      {inputGlobalStyles}
      <ErrorBoundary>
        <Suspense fallback={<Loader show text="Shipizzy" />}>
          {isInitialized ? content : <Loader show text="Shipizzy" />}
        </Suspense>
      </ErrorBoundary>
      <Toaster
        toastOptions={{
          style: {
            maxWidth: "500px",
          },
        }}
      />
    </ThemeProvider>
  );
};

export default App;
