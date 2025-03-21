import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shipmentList: [],
};

const shipmentListSlice = createSlice({
  name: "shipmentList",
  initialState,
  reducers: {
    addShipment: (state, action) => {
      state.shipmentList.push(action.payload);
    },
    updateShipment: (state, action) => {
      const index = state.shipmentList.findIndex(
        (shipment) => shipment.userId === action.payload.userId
      );
      if (index !== -1) {
        state.shipmentList[index] = action.payload;
      }
    },
    deleteShipment: (state, action) => {
      state.shipmentList = state.shipmentList.filter(
        (shipment) => shipment.userId !== action.payload
      );
    },
  },
});

export const { addShipment, updateShipment, deleteShipment } =
  shipmentListSlice.actions;
export default shipmentListSlice.reducer;
