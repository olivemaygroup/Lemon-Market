"use client"

import { createSlice } from "@reduxjs/toolkit"
import { UserType } from "@/app/types/types"

const initialState: UserType = {
  tenant_id: 0,
  firstName: '',
  lastName: '',
  email: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: initialState
  },
  reducers: {
    setUserSlice: (state, action: { type: string; payload: UserType }) => {
      state.value = action.payload
    }
  }
})

export const { setUserSlice } = userSlice.actions;

export default userSlice.reducer;