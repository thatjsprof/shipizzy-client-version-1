import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import { graphql } from "react-apollo";
import { useEffect, useState } from "react";
import { flowRight as compose } from "lodash";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import theme from "../../../App/Layout/CustomTheme";
import { Link, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import UIButton from "../../../Components/UI/Button/Button.component";
import {
  DECODE_TOKEN,
  VERIFY_USER,
} from "../../../Graphql/Resolvers/Users/Users.mutationdefs";

interface ResponseInterface {
  message: string;
  status: boolean;
}

const Response = ({ message, status }: ResponseInterface) => {
  return (
    <div>
      {status ? (
        <CheckIcon
          sx={{ fontSize: "6rem", color: theme.palette.success.main }}
        />
      ) : (
        <ClearIcon sx={{ fontSize: "6rem", color: theme.palette.error.main }} />
      )}
      <Typography sx={{ mt: 2, fontSize: "2rem" }}>{message}</Typography>
      <Typography sx={{ mt: 3, fontSize: "2rem" }}>
        Click{" "}
        <Link to="/login" style={{ color: theme.palette.primary.main }}>
          here
        </Link>{" "}
        to Login
      </Typography>
    </div>
  );
};

const VerifyAccount = ({ decodeToken, verifyUser }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [todayDate] = useState<number>(new Date().getTime() / 1000);
  const [, setVerified] = useState<string>("");
  const [data, setData] = useState<{
    id: string;
    email: string;
    iat: number;
    exp: number;
  }>({
    id: "",
    email: "",
    iat: 0,
    exp: 0,
  });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  useEffect(() => {
    async function decodeTokenFunc() {
      if (token) {
        try {
          setLoading(true);
          const data = await decodeToken({
            variables: { token },
          });
          const userInfo = data.data.verifyToken;
          const result = await verifyUser({
            variables: { id: userInfo.id },
          });
          setData(userInfo);
          setVerified(result.data.verifyUser);
          setLoading(false);
        } catch (error: any) {
          setLoading(false);
          if (error.networkError)
            toast.error("There is a Server Connection Error");
          error.graphQLErrors.map((error: any) => toast.error(error.message));
        } finally {
          setLoading(false);
        }
      }
    }

    decodeTokenFunc();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Box>
      <Box sx={{ display: "flex", padding: "1rem 1rem 0rem 1rem" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/login">
            <img src="/Images/Logo/Logo.png" alt="Logo" />
          </Link>
        </Box>
        <div>
          <Link to="/login" style={{ marginRight: 25 }}>
            Sign In
          </Link>
          <UIButton variant="contained" type="button">
            Create an Account
          </UIButton>
        </div>
      </Box>

      <Container maxWidth="md">
        <Box
          sx={{
            display: "grid",
            height: "100vh",
          }}
        >
          <div style={{ margin: "auto 0rem" }}>
            <Box
              sx={{
                width: 4 / 4,
                boxShadow: "",
                display: "grid",
                margin: "0 auto",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <>
                    {data.email && token ? (
                      data.exp > todayDate ? (
                        <Response
                          message={`Hi ${data.email}, your account has been successfully verified`}
                          status={true}
                        />
                      ) : (
                        <Response
                          message={`Hi ${data.email}, your account could not be verified`}
                          status={false}
                        />
                      )
                    ) : (
                      <Response
                        message={`Invalid response or no token provided`}
                        status={false}
                      />
                    )}
                  </>
                )}
              </Box>
            </Box>
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default compose(
  graphql(DECODE_TOKEN, { name: "decodeToken" }),
  graphql(VERIFY_USER, { name: "verifyUser" })
)(VerifyAccount);
