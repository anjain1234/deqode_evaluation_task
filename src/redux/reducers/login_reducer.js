import { FETCH_PROFILE_ERROR, FETCH_PROFILE_SUCCESS } from "../action_types/profile_sction_types";

const initialState = { isLoading: false, userData: null };

export default login_reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: true,
                userData: payload,
            };
        case FETCH_PROFILE_ERROR:
            return {
                ...state,
                isLoading: false,
                userData: null,
            };
        default:
            return state;
    }
};