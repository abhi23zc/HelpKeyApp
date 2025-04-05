import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
  msg: null,
  isLoading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSucces: (state, action) => {
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      state.isAuthenticated = action?.payload?.isAuthenticated;
      state.error = action?.payload?.error;
    },
    loginSucces: (state, action) => {
      state.user = action?.payload?.user;
      state.token = action?.payload?.token;
      state.isAuthenticated = action?.payload?.isAuthenticated;
      state.error = action?.payload?.error;
    },
    loginFailed: (state, action) => {
      state.error = action.payload.error;
      state.msg = action.payload.msg
      state.isLoading = false
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

    },

    onLoading: (state, action) => {
      state.isLoading = action.payload
    },
    authSuccess: (state, action) => {
      state.token = action.payload.token,
        state.isAuthenticated = action.payload.isAuthenticated,
        state.isLoading = false
    },
    reset :(state, action)=>{
      state.user= null,
      state.token= null,
      state.isAuthenticated= false,
      state.error= null,
      state.msg= null,
      state.isLoading= false
    }

  }
})

export const { reset, loginSucces, loginFailed, logout, onLoading, authSuccess, registerSucces } = authSlice.actions
export const authReducer = authSlice.reducer