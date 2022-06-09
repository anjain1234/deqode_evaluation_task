import auth from '@react-native-firebase/auth';
import { EMAIL_FOUND_ERROR, EMAIL_FOUND_SUCCESS } from '../action_types/email_input_action_type';
import { LOGIN_ERROR } from '../action_types/login_action_type';
import { SIGNUP_ERROR, SIGNUP_SUCCESS } from '../action_types/signup_action_types';

export const emailFound = (email, callback) => async dispatch => {
    try {
        auth()
            .fetchSignInMethodsForEmail(email)
            .then(() => {
                dispatch({ type: EMAIL_FOUND_SUCCESS });
                callback(null);
            })
            .catch((error) => {
                dispatch({
                    type: EMAIL_FOUND_ERROR,
                    payload: "Invalid login credentials"
                });
                console.log("\n\n \n\n emailFound", error)
                callback(error)
            });
    } catch (err) {
        dispatch({ type: EMAIL_FOUND_ERROR, payload: "Email not found" });
    }
};

export const signin = (email, password, callback) => async dispatch => {
    console.log("\n\n signin called...")
    try {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("\n\n signin success...")
                dispatch({ type: LOGIN_SUCCESS });
                callback(null);
            })
            .catch((error) => {
                console.log("\n\n signin failed...", error)
                dispatch({
                    type: LOGIN_ERROR,
                    payload: "Invalid login credentials"
                });
                callback(error);
            });
    } catch (err) {
        dispatch({ type: LOGIN_ERROR, payload: "Invalid login credentials" });
        callback(err);
    }
};

// Signing up with Firebase
export const signup = (email, password, callback) => async dispatch => {
    try {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(dataBeforeEmail => {
                dispatch({ type: SIGNUP_SUCCESS });
                callback(null);
                // auth().onAuthStateChanged(function (user) {
                //     user.sendEmailVerification();
                // });
            })
            .then(dataAfterEmail => {
                auth().onAuthStateChanged(function (user) {
                    dispatch({
                        type: SIGNUP_SUCCESS,
                        payload:
                            "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."
                    });
                    callback(dataAfterEmail);
                });
            })
            .catch(function (error) {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload:
                        "Something went wrong, we couldn't create your account. Please try again."
                });
                callback(error);
            });
    } catch (err) {
        dispatch({
            type: SIGNUP_ERROR,
            payload:
                "Something went wrong, we couldn't create your account. Please try again."
        });
        callback(err);
    }
};

export const logout = () => (dispatch) => {
    return AuthService.logOut().then((response) => {
        if (response.status === "success") {
            dispatch({
                type: LOGOUT,
            });
            Promise.resolve();
            return response;
        }
    });
};