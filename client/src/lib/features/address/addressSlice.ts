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

export const addAddressSlice = createSlice({
  name: "addAddress",
  initialState,
  reducers: {

    addAddress: (state, action) => {
      console.log('action console', action.payload)
      state.description = action.payload.value.description;
      state.place_id = action.payload.value.place_id;
    },
  },
});

export const { addAddress } = addAddressSlice.actions;

export default addAddressSlice.reducer;
