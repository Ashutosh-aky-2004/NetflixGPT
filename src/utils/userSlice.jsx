// src/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    userSignIn: (state, action) => {
      return action.payload;
    },
    userSignOut: () => {
      return null;
    },
  },
});

export const { userSignIn, userSignOut } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state) => state.user;