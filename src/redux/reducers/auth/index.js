import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestLoginInfo: {},
  loginInfo: {},
  userInfo: {},
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRequestLoginInfo: (state, action) => {
      state.requestLoginInfo = action.payload;
    },
    setLoginInfo: (state, action) => {
      state.loginInfo = action.payload;
    },
    setUserInfoSignup: (state, action) => {
      state.userInfo = action.payload;
    },
    setLogOut: (state) => {
      localStorage.token = "";
      localStorage.removeItem("adminInfo");
      state.requestLoginInfo.userInfoType = 0;
    },
    setStep: (state, action) => {
      state.requestLoginInfo.userInfoType = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;
export const {
  setRequestLoginInfo,
  setLoginInfo,
  setUserInfoSignup,
  setLogOut,
  setStep,
} = actions;
export default reducer;
