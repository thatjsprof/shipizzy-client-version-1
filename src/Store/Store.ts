import userSlice from "./UserSlice";
import { configureStore } from "@reduxjs/toolkit";
import fulfillmentSlice from "./FulfillmentSlice";
import addressSlice from "./AddressSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    address: addressSlice,
    fulfillment: fulfillmentSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
