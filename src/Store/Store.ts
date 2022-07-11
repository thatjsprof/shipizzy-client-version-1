import userSlice from "./UserSlice";
import { configureStore } from "@reduxjs/toolkit";
import fulfillmentSlice from "./FulfillmentSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    fulfillment: fulfillmentSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
