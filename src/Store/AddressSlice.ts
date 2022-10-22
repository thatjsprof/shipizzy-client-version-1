import store from "./Store";
import MakeGraphQLRequest, {
  checkError,
  IRequestProps,
} from "Utils/GraphqlRequest";
import { Address } from "Interfaces/Address";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddressesObject {
  mainAddresses?: Address[];
  subAddresses?: Address[];
}

interface InitialState {
  addresses: AddressesObject;
}
const initialState: InitialState = {
  addresses: {
    mainAddresses: [],
    subAddresses: [],
  },
};

export const getAddresses = async (requestOptions: IRequestProps) => {
  try {
    const { data, error } = await MakeGraphQLRequest(requestOptions);

    checkError(error);

    if (data) {
      const addressesObject: {
        mainAddresses: Address[];
        subAddresses: Address[];
      } = {
        mainAddresses: [],
        subAddresses: [],
      };

      data.getUsersAddress.forEach((address: Address) => {
        const type = address.addressType;
        const { mainAddresses, subAddresses } = addressesObject;

        if (type === "international") {
          addressesObject["mainAddresses"] = [...mainAddresses, address];
        } else {
          addressesObject["subAddresses"] = [...subAddresses, address];
        }
      });

      store.dispatch(
        setAddresses({
          addresses: {
            mainAddresses: addressesObject.mainAddresses,
            subAddresses: addressesObject.subAddresses,
          },
        })
      );
    }
  } catch (error) {
    store.dispatch(
      setAddresses({
        addresses: {
          mainAddresses: [],
          subAddresses: [],
        },
      })
    );
  }
};

const addressSlice = createSlice({
  initialState,
  reducers: {
    setAddresses: (
      state,
      action: PayloadAction<{
        addresses: AddressesObject;
      }>
    ) => {
      state.addresses = action.payload.addresses;
    },
  },
  name: "addresses",
  extraReducers: (builder) => {},
});

export default addressSlice.reducer;
export const { setAddresses } = addressSlice.actions;
