import Store from "./Store";
import MakeGraphQLRequest, {
  checkError,
  IRequestProps,
} from "Utils/GraphqlRequest";
import { UserState } from "Interfaces/Auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  user: {
    id: null,
    sex: null,
    email: null,
    lastName: null,
    firstName: null,
    isVerified: null,
    phoneNumber: null,
    dateOfBirth: null,
    accountType: null,
  },
  isInitialized: false,
  isAuthenticated: false,
};

const emptyUser = {
  id: null,
  sex: null,
  email: null,
  lastName: null,
  firstName: null,
  isVerified: null,
  phoneNumber: null,
  dateOfBirth: null,
  acccountType: null,
};

export const retrieveUser = async (userID: string, getUser: any) => {
  let requestOptionsGetUser: IRequestProps = {
    payloadOptions: {
      variables: { userID: userID || null },
    },
    requestFunction: getUser,
  };

  const { data, error } = await MakeGraphQLRequest(requestOptionsGetUser);
  checkError(error);
  return data.getUser;
};

export const getCurrentAuthenticatedUser = async (
  getUser: any,
  requestOptionsDecodeToken: IRequestProps
) => {
  try {
    if (requestOptionsDecodeToken.payloadOptions?.variables.token) {
      const { data, error } = await MakeGraphQLRequest(
        requestOptionsDecodeToken
      );

      checkError(error);

      const nullData = { id: null, _id: null, name: null, email: null };

      const resultToSave = data ? data.verifyToken : nullData;
      const userID = resultToSave.id;
      const userData = userID ? await retrieveUser(userID, getUser) : nullData;
      const splitFirstName = userData?.name.split(" ");

      return Store.dispatch(
        setCurrentUser({
          user: {
            id: userData?._id,
            sex: userData?.sex,
            email: userData?.email,
            lastName: splitFirstName[1],
            firstName: splitFirstName[0],
            isVerified: userData?.isVerified,
            dateOfBirth: userData?.dateOfBirth,
            phoneNumber: userData?.phoneNumber,
            accountType: userData?.accountType,
          },
          isAuthenticated: userData?._id ? true : false,
        })
      );
    } else {
      return Store.dispatch(
        setCurrentUser({
          user: emptyUser,
          isAuthenticated: false,
        })
      );
    }
  } catch (error) {
    return Store.dispatch(
      setCurrentUser({
        user: emptyUser,
        isAuthenticated: false,
      })
    );
  }
};

export const LogoutUser = async () => {
  return Store.dispatch(
    setCurrentUser({
      user: emptyUser,
      isAuthenticated: false,
    })
  );
};

const userSlice = createSlice({
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: any }>) => {
      state.user = action.payload.user;
    },
    setCurrentUser: (
      state,
      action: PayloadAction<{ user: any; isAuthenticated?: boolean }>
    ) => {
      state.isInitialized = true;
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
  name: "user",
  extraReducers: (builder) => {},
});

export default userSlice.reducer;
export const { setUser, setCurrentUser } = userSlice.actions;
