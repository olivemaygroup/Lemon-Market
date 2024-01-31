"use client";

import { createSlice } from "@reduxjs/toolkit";
import { PropertyType } from "@/app/types/property-type";


const initialState: PropertyType = {
  fullAddress: '',
  property_id: '',
};

export const propertySlice = createSlice({
  name: "property",
  initialState: {
    value: initialState
  },
  reducers: {
    addProperty: (state, action: { type: string; payload: PropertyType }) => {
      state.value = action.payload
    },
  },
});

export const { addProperty } = propertySlice.actions;

export default propertySlice.reducer;
