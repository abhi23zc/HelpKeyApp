import AsyncStorage from "@react-native-async-storage/async-storage";
import { onLoading, loginFailed, loginSucces, authSuccess, logout } from "../store/features/authFeature/auth.slice";
import axios from 'axios'


export const loginUser = async (dispatch, email, password) => {
    dispatch(onLoading(true));
    try {
        const response = await axios.post("https://helpkeyapi.onrender.com/api/login", {
            email,
            password,
        });

        console.log(response.data);
        const { token, msg, error, isAuthenticated } = response.data;

        await AsyncStorage.setItem("token", token);
        dispatch(loginSucces({ token, msg, error, isAuthenticated }));

    } catch (error) {
        console.log(error)
        dispatch(loginFailed("Login failed"));
    }

    dispatch(onLoading(false))
};

export const authUser = async (dispatch) => {
    dispatch(onLoading(true));
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
    dispatch(onLoading(false))
};


export const logOut = async (dispatch) => {
    await AsyncStorage.setItem("token", '');
    dispatch(logout());

}