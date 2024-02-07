"use client";

import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
  name: "authentication status",
  initialState: {
    value: false
  },
  reducers: {
    changeAuthStatus: (state, action: { type: string; payload: boolean }) => {
      state.value = action.payload
    },
  },
});

export const { changeAuthStatus } = authSlice.actions;

export default authSlice.reducer;
