import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
    msg:null,
    isLoading:false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSucces: (state, action) => {
          state.user = action.payload?.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.error = null;
        },
        loginFailed: (state, action) => {
          state.error = action.payload;
        },
        logout: (state) => {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          state.error = null;
          localStorage.removeItem("token"); 
        },

        onLoading:(state, action)=>{
            state.isLoading = action.payload
        },
        authSuccess : (state, action)=>{
          state.token = action.payload.token,
          state.isAuthenticated = action.payload.isAuthenticated,
          state.isLoading = false
        }

    }
})

export const { loginSucces, loginFailed, logout, onLoading , authSuccess} = authSlice.actions
export const authReducer =  authSlice.reducer