import AsyncStorage from "@react-native-async-storage/async-storage";
import { SIGNUP_ERROR, SIGNUP_SUCCESS } from "../action_types/signup_action_types";

const initialState = { isLoading: false, user: null };

export default signup_reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: true,
                user: payload,
            };
        case SIGNUP_ERROR:
            return {
                ...state,
                isLoading: false,
                user: null,
            };
        default:
            return state;
    }
};