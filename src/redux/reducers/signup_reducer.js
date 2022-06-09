import AsyncStorage from "@react-native-async-storage/async-storage";
import { SIGNUP_ERROR, SIGNUP_SUCCESS } from "../action_types/signup_action_types";

const user = AsyncStorage.getItem("user");

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export default signup_reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case SIGNUP_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
};