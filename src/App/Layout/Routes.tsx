import React from "react";
import { AuthRoutes, LandingRoutes, AppRoutes } from "Services/Routes";
const {
  TransactionsRoutes,
  FulfillmentsRoutes,
  InvestmentsRoutes,
  DashboardRoutes,
  SettingsRoutes,
  WalletRoutes,
} = AppRoutes;
const AppLayout = React.lazy(() => import("Layouts/AppLayout"));
const AuthGuard = React.lazy(() => import("Utils/AuthGuard"));
const LandingPage = React.lazy(() => import("Pages/Landing/Landing"));
const LoginPage = React.lazy(() => import("Pages/Auth/Login/Login"));
const ForgotPasswordPage = React.lazy(
  () => import("Pages/Auth/ForgotPassword/ForgotPassword")
);
const ResetPasswordPage = React.lazy(
  () => import("Pages/Auth/ResetPassword/ResetPassword")
);
const SignUpPage = React.lazy(() => import("Pages/Auth/Signup/Signup"));
const VerifyPage = React.lazy(
  () => import("Pages/Auth/VerifyAccount/VerifyAccount")
);
const GoogleVerify = React.lazy(
  () => import("Pages/Auth/VerifyAccount/VerifyAccountGoogle")
);
const DashboardPage = React.lazy(
  () => import("Pages/App/Dashboard/Dashboard.container")
);
const TransactionsPage = React.lazy(
  () => import("Pages/App/Transactions/Transactions.container")
);
const Fulfillments = React.lazy(() => import("Pages/App/Fulfillments"));
const FulfillmentsPage = React.lazy(
  () => import("Pages/App/Fulfillments/Fulfillments.container")
);
const FulfillmentsLayout = React.lazy(
  () => import("Pages/App/Fulfillments/FulfillmentsLayout.container")
);
const WalletPage = React.lazy(
  () => import("Pages/App/Wallet/Wallet.container")
);
const InvestmentsPage = React.lazy(
  () => import("Pages/App/Investments/Investments.container")
);
const SettingsLayout = React.lazy(
  () => import("Pages/App/Settings/SettingsLayout")
);
const SettingsPage = React.lazy(
  () => import("Pages/App/Settings/Settings.container")
);
const ProfilePage = React.lazy(
  () => import("Pages/App/Settings/Profile/Profile.container")
);
const AccountPage = React.lazy(
  () => import("Pages/App/Settings/Account/Account.container")
);
const GeneralPage = React.lazy(
  () => import("Pages/App/Settings/General/General.container")
);
const AddressesPage = React.lazy(
  () => import("Pages/App/Settings/Addresses/Addresses.container")
);

const routes = [
  {
    path: LandingRoutes.INDEX,
    element: <LandingPage />,
  },
  {
    path: AuthRoutes.LOGIN.INDEX,
    element: <LoginPage />,
  },
  {
    path: AuthRoutes.LOGIN.VERIFY_ACCOUNT,
    element: <GoogleVerify />,
  },
  {
    path: AuthRoutes.LOGIN.VERIFY_ACCOUNT_TOKEN,
    element: <VerifyPage />,
  },
  {
    path: AuthRoutes.LOGIN.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: AuthRoutes.LOGIN.RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },
  {
    path: AuthRoutes.SIGNUP.INDEX,
    element: <SignUpPage />,
  },
  {
    path: "*",

    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: DashboardRoutes.INDEX,
        element: <DashboardPage />,
      },
      {
        path: FulfillmentsRoutes.FULFILLMENTS.INDEX,
        children: [
          {
            path: "*",
            element: <FulfillmentsPage />,
          },
          {
            path: FulfillmentsRoutes.FULFILLMENTS.NEW,
            element: <Fulfillments />,
            children: [
              {
                path: "",
                element: <FulfillmentsLayout />,
              },
            ],
          },
        ],
      },
      {
        path: TransactionsRoutes.TRANSACTIONS.INDEX,
        element: <TransactionsPage />,
      },
      {
        path: WalletRoutes.WALLET.INDEX,
        element: <WalletPage />,
      },
      {
        path: InvestmentsRoutes.INVESTMENTS.INDEX,
        element: <InvestmentsPage />,
      },
      {
        path: SettingsRoutes.SETTINGS.INDEX,
        children: [
          {
            path: "*",
            element: <SettingsPage />,
          },
          {
            path: "*",
            element: <SettingsLayout />,
            children: [
              {
                path: SettingsRoutes.SETTINGS.PROFILE,
                element: <ProfilePage />,
              },
              {
                path: SettingsRoutes.SETTINGS.ACCOUNT,
                element: <AccountPage />,
              },
              {
                path: SettingsRoutes.SETTINGS.GENERAL,
                element: <GeneralPage />,
              },
              {
                path: SettingsRoutes.SETTINGS.ADDRESSES,
                element: <AddressesPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
