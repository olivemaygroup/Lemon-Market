"use client";

import { createSlice } from "@reduxjs/toolkit";

import { Review } from "@/app/types/review-types";


export const reviewListSlice = createSlice({
  name: "addReview",
  initialState:  {
    value: [],
  },
  reducers: {
    setReviewListSlice: (state: { value: Review[] }, action: { type: string; payload: Review[] }) => {
      state.value = action.payload;
      console.log('reviewList', state.value)
    },
  },
});

export const { setReviewListSlice } = reviewListSlice.actions;

export default reviewListSlice.reducer;
