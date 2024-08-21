import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    addUser: (state, { payload }) => {
      (state.user = payload.user),
        Cookies.set("user", JSON.stringify(payload.user));
    },
    removeCookies: (state) => {
      (state.user = null), Cookies.remove("user");
    },
  },
});

export const { addUser, removeCookies } = authSlice.actions;
export default authSlice.reducer;
