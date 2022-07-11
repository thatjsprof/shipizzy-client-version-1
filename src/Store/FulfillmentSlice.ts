import {
  FulfillmentTypes,
  FulfillmentState,
  FulfillmentStages,
  FulfillmentOption,
} from "Interfaces/Fulfillment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FulfillmentState = {
  id: null,
  stage: null,
  fulfillmentItem: [],
  fulfillmentType: null,
  fulfillmentOption: null,
  fulfillmentSender: null,
  fulfillmentSummary: null,
  fulfillmentReceiver: null,
  fulfillmentShipping: null,
};

const fulfillmentSlice = createSlice({
  initialState,
  reducers: {
    setFulfillmentStage: (
      state,
      action: PayloadAction<{ stage: FulfillmentStages }>
    ) => {
      state.stage = action.payload.stage;
    },
    setFulfillmentOption: (
      state,
      action: PayloadAction<{
        type?: FulfillmentTypes | null;
        stage?: FulfillmentStages | null;
        option?: FulfillmentOption | null;
      }>
    ) => {
      state.stage = action.payload.stage || null;
      state.fulfillmentType = action.payload.type || null;
      state.fulfillmentOption = action.payload.option || null;
    },
  },
  name: "fulfillment",
  extraReducers: (builder) => {},
});

export default fulfillmentSlice.reducer;
export const { setFulfillmentStage, setFulfillmentOption } =
  fulfillmentSlice.actions;
