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

export const AUTH_PROCESS = "AUTH_PROCESS";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const OTP_LOGIN_PROCESS = "OTP_LOGIN_PROCESS";
export const OTP_FAIL = "OTP_FAIL";
export const CLEAN_STATES = "CLEAN_STATES";
export const CLEAN_MESSAGE = "CLEAN_MESSAGE";

export const loginReducer = (state, action) => {
    switch (action.type) {
        case "AUTH_PROCESS":
            return {
                ...state,
                loading: action.payload,
            }
        case "SET_USER":
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.name]: action.payload.value,
                },
            }
        case "AUTH_SUCCESS":
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
            }
        case "AUTH_FAIL":
            return {
                ...state,
                loading: action.payload.loading,
                dialogSMS: action.payload.dialogSMS,
                message: action.payload.message,
            }
        case "OTP_LOGIN_PROCESS":
            return {
                ...state,
                dialogSMS: action.payload,
            }
        case "OTP_FAIL":
            return {
                ...state,
                dialogSMS: action.payload.dialogSMS,
                loading: action.payload.loading,
                message: action.payload.message,
            }
        case "CLEAN_STATES":
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
            }
        case "CLEAN_MESSAGE":
            return {
                ...state,
                message: action.payload.message,
            }

        default: return state;
    }
}