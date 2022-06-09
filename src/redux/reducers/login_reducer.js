import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from "../action_types/login_action_type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EMAIL_FOUND_ERROR, EMAIL_FOUND_SUCCESS } from "../action_types/email_input_action_type";

const user = AsyncStorage.getItem("user");

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export default login_reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case EMAIL_FOUND_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: null,
            };
        case EMAIL_FOUND_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
};