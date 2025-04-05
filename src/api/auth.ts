import AsyncStorage from "@react-native-async-storage/async-storage";
import { onLoading, loginFailed, loginSucces, authSuccess, logout, registerSucces, reset } from "../store/features/authFeature/auth.slice";
import axios from 'axios'

export const registerUser = async (dispatch, formData) => {
    dispatch(onLoading(true));
    dispatch(reset(null));
    try {
        const response = await axios.post("https://helpkeyapi.onrender.com/api/signup", {
            name: formData.name,
            email: formData.email,
            password: formData.password
        })
        // console.log(response.data)
        const { token, isAuthenticated, error } = response.data;
        dispatch(registerSucces({ token, isAuthenticated, error }))
    } catch (error) {
        console.log("Register: ", error)
    }
    dispatch(onLoading(false))
};


export const loginUser = async (dispatch, email, password) => {
    dispatch(reset(null));
    dispatch(onLoading(true))
    try {
        const response = await axios.post("https://helpkeyapi.onrender.com/api/login", {
            email,
            password,
        });

        console.log(response.data);
        const { token, msg, error, isAuthenticated } = response.data;
        if(error){
            alert(error)
            dispatch(reset(null))
            return;
        }
        if(!token){
            alert(msg)
            dispatch(reset(null))
  
            return;
        }
        await AsyncStorage.setItem("token", token);
        dispatch(loginSucces({ token, msg, error, isAuthenticated }));

    } catch (error) {
        console.log(error)
        dispatch(loginFailed("Login failed"));
    }

};

export const authUser = async (dispatch) => {

    console.log("Fetching user")
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.post("https://helpkeyapi.onrender.com/api/authuser", {
            token: token,
        });
        // console.log(response)

        const { isAuthenticated } = response.data;
        // console.log(isAuthenticated)
        dispatch(authSuccess({ token, isAuthenticated }));

    } catch (error) {
        dispatch(loginFailed("Unauthorized User"));
    }
};


export const logOut = async (dispatch) => {
    await AsyncStorage.setItem("token", '');
    dispatch(logout());

}