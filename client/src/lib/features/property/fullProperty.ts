"use client";

import { createSlice } from "@reduxjs/toolkit";
import { PropertyType, PropertyTypeFull } from "@/app/types/property-type";


const initialState: PropertyType = {
  fullAddress: '',
  property_id: '',
  avg_rating: 0,
  num_of_reviews: 0
};

export const fullPropertySlice = createSlice({
  name: "property",
  initialState: {
    value: initialState
  },
  reducers: {
    addFullProperty: (state, action: { type: string; payload: PropertyType }) => {
      state.value = action.payload
    },
  },
});

export const { addFullProperty } = fullPropertySlice.actions;

export default fullPropertySlice.reducer;
