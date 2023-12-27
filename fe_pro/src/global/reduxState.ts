import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "" || null,
  cookie: "" || null,
  id: "" || null,
};

const reduxState = createSlice({
  name: "test-class",
  initialState,
  reducers: {
    loginUser: (state: any, { payload }) => {
      state.user = payload;
    },

    userCookie: (state: any, { payload }) => {
      state.cookie = payload;
    },

    userID: (state: any, { payload }) => {
      state.id = payload;
    },

    logOutUser: (state: any) => {
      state.user = null;
    },
  },
});

export const { loginUser, logOutUser, userCookie, userID } = reduxState.actions;

export default reduxState.reducer;
