export const INITIAL_STATE = {
    loading: false,
    dialogSMS: false,
    message: {
        color: "",
        text: "",
        icon: "",
    },
    user: {
        email: "",
        password: "",
        phoneNumber: "",
    }
}

export const SET_USER = "SET_USER";

export const AUTH_PROCESS = "AUTH_PROCESS";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";

export const OTP_LOGIN_PROCESS = "OTP_LOGIN_PROCESS";
export const OTP_FAIL = "OTP_FAIL";

export const MISSING_INPUTS = "MISSING_INPUTS";

export const loginReducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.name]: action.payload.value,
                },
            }
        case AUTH_PROCESS:
            return {
                ...state,
                loading: true,
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                message: {
                    color: "green",
                    text: "Successfully logged in",
                    icon: "success"
                }
            }
        case AUTH_FAIL:
            return {
                ...state,
                loading: false,
                dialogSMS: false,
                message: {
                    color: "red",
                    text: "Information's are not correct",
                    icon: "error",
                }
            }
        case OTP_LOGIN_PROCESS:
            return {
                ...state,
                dialogSMS: true,
            }
        case OTP_FAIL:
            return {
                ...state,
                loading: false,
                dialogSMS: false,
                message: {
                    color: "red",
                    text: "SMS code is not correct",
                    icon: "error",
                },
            }
        case MISSING_INPUTS:
            return {
                ...state,
                loading: false,
                message: {
                    color: "orange",
                    text: "Please fill the inputs",
                    icon: "warning"
                }
            }

        default: return state;
    }
}