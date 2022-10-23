import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import { graphql } from "react-apollo";
import Lf from "Utils/LocalForage/config";
import { useEffect, useState } from "react";
import { flowRight as compose } from "lodash";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentAuthenticatedUser } from "Store/UserSlice";
import Loader from "Components/Global/Loader/Loader.component";
import {
  DECODE_TOKEN,
  GET_USER,
  LOGIN_GOOGLE_GET_USER,
} from "Graphql/Resolvers/Users/Users.mutationdefs";
import { IRequestProps } from "Utils/GraphqlRequest";

const VerifyAccountGoogle = ({
  loginAuthGetUser,
  getUser,
  decodeToken: makeDecodeToken,
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const code = query.get("code");

  useEffect(() => {
    const decodeToken = async (token: string) => {
      let requestOptionsDecodeToken: IRequestProps = {
        payloadOptions: {
          variables: { token: token },
        },
        requestFunction: makeDecodeToken,
      };

      console.log(requestOptionsDecodeToken);

      await getCurrentAuthenticatedUser(getUser, requestOptionsDecodeToken);
    };

    async function getCode() {
      if (code) {
        try {
          setLoading(true);
          const { data } = await loginAuthGetUser({
            variables: { code },
          });

          if (data) {
            Lf.setItem<string>("authToken", data.loginAuthGetUser);
            await decodeToken(data.loginAuthGetUser);
            toast.success("You have Signed In");
            setLoading(false);
            navigate("/dashboard");
          }
        } catch (error: any) {
          setLoading(false);
          setError("There was an error trying to log you in");
          if (error.networkError)
            toast.error("There is a Server Connection Error");
          error.graphQLErrors.map((error: any) => toast.error(error.message));
        }
      } else {
        navigate("/login");
        toast.error("Code provided is invalid");
      }
    }

    getCode();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <>
      <Loader show={loading} text={"Logging you in"}></Loader>

      <Container maxWidth="md">
        <Box
          sx={{
            display: "grid",
            height: "100vh",
          }}
        >
          <div
            style={{
              margin: "auto 0rem",
            }}
          >
            <Box
              sx={{
                width: 4 / 4,
                boxShadow: "",
                display: "grid",
                margin: "0 auto",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                {error && (
                  <Typography
                    sx={{
                      fontSize: "2.5rem",
                    }}
                  >
                    {error}
                  </Typography>
                )}
              </Box>
            </Box>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default compose(
  graphql(GET_USER, { name: "getUser" }),
  graphql(DECODE_TOKEN, { name: "decodeToken" }),
  graphql(LOGIN_GOOGLE_GET_USER, { name: "loginAuthGetUser" })
)(VerifyAccountGoogle);
