import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";
import GlobalEntryStyles from "./GlobalEntryStyles";
import Theme from "./CustomTheme";
import ErrorBoundary from "../../Components/Errors/ErrorBoundary/ErrorBoundary.component";
import Loader from "../../Components/Global/Loader/Loader.component";
import { AuthRoutes, LandingRoutes, AppRoutes } from "../../Services/Routes";
const {
  TransactionsRoutes,
  FulfillmentsRoutes,
  WalletRoutes,
  InvestmentsRoutes,
  DashboardRoutes,
  SettingsRoutes,
} = AppRoutes;
const inputGlobalStyles = <GlobalStyles styles={GlobalEntryStyles} />;
const AppLayout = React.lazy(() => import("../../Layouts/AppLayout"));
const ComponentsPage = React.lazy(() => import("../../Pages/Components"));
const LandingPage = React.lazy(() => import("../../Pages/Landing/Landing"));
const LoginPage = React.lazy(() => import("../../Pages/Auth/Login/Login"));
const ForgotPasswordPage = React.lazy(
  () => import("../../Pages/Auth/ForgotPassword/ForgotPassword")
);
const SignUpPage = React.lazy(() => import("../../Pages/Auth/Signup/Signup"));
const DashboardPage = React.lazy(
  () => import("../../Pages/App/Dashboard/Dashboard.container")
);
const TransactionsPage = React.lazy(
  () => import("../../Pages/App/Transactions/Transactions.container")
);
const FulfillmentsPage = React.lazy(
  () => import("../../Pages/App/Fulfillments/Fulfillments.container")
);
const WalletPage = React.lazy(
  () => import("../../Pages/App/Wallet/Wallet.container")
);
const InvestmentsPage = React.lazy(
  () => import("../../Pages/App/Investments/Investments.container")
);
const SettingsPage = React.lazy(
  () => import("../../Pages/App/Settings/Settings.container")
);
const ProfilePage = React.lazy(
  () => import("../../Pages/App/Settings/Profile/Profile.container")
);
const GeneralPage = React.lazy(
  () => import("../../Pages/App/Settings/General/General.container")
);
const AddressesPage = React.lazy(
  () => import("../../Pages/App/Settings/Addresses/Addresses.container")
);

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      {inputGlobalStyles}
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Loader show text="Shipizzy" />}>
            {/* Components Page */}
            <Route exact path="/components" component={ComponentsPage} />
            {/* Auth Pages */}
            <Route exact path={LandingRoutes.INDEX} component={LandingPage} />
            <Route exact path={AuthRoutes.LOGIN.INDEX} component={LoginPage} />
            <Route
              exact
              path={AuthRoutes.LOGIN.FORGOT_PASSWORD}
              component={ForgotPasswordPage}
            />
            <Route
              exact
              path={AuthRoutes.SIGNUP.INDEX}
              component={SignUpPage}
            />
            {/* App Pages */}
            <Route
              exact
              path={DashboardRoutes.INDEX}
              render={() => (
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              )}
            />{" "}
            <Route
              exact
              path={FulfillmentsRoutes.FULFILLMENTS.INDEX}
              render={() => (
                <AppLayout>
                  <FulfillmentsPage />
                </AppLayout>
              )}
            />{" "}
            <Route
              exact
              path={TransactionsRoutes.TRANSACTIONS.INDEX}
              render={() => (
                <AppLayout>
                  <TransactionsPage />
                </AppLayout>
              )}
            />{" "}
            <Route
              exact
              path={WalletRoutes.WALLET.INDEX}
              render={() => (
                <AppLayout>
                  <WalletPage />
                </AppLayout>
              )}
            />{" "}
            <Route
              exact
              path={InvestmentsRoutes.INVESTMENTS.INDEX}
              render={() => (
                <AppLayout>
                  <InvestmentsPage />
                </AppLayout>
              )}
            />{" "}
            <Route
              exact
              path={SettingsRoutes.SETTINGS.INDEX}
              render={() => (
                <AppLayout>
                  <SettingsPage />
                </AppLayout>
              )}
            />{" "}
            <Route
              exact
              path={SettingsRoutes.SETTINGS.PROFILE}
              render={() => (
                <AppLayout>
                  <ProfilePage />
                </AppLayout>
              )}
            />{" "}
            <Route
              exact
              path={SettingsRoutes.SETTINGS.GENERAL}
              render={() => (
                <AppLayout>
                  <GeneralPage />
                </AppLayout>
              )}
            />{" "}
            <Route
              exact
              path={SettingsRoutes.SETTINGS.ADDRESSES}
              render={() => (
                <AppLayout>
                  <AddressesPage />
                </AppLayout>
              )}
            />{" "}
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
