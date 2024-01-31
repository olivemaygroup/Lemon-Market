"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface AddressState {
  description: string;
  place_id: string;
}

const initialState: AddressState = {
  description: '',
  place_id: '',
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
  
    addAddress: (state, action) => {
      state.description = action.payload.value.description;
      state.place_id = action.payload.value.place_id;
    },
  },
});

export const { addAddress } = addressSlice.actions;

export default addressSlice.reducer;
