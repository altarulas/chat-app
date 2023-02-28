export const INITIAL_STATE = {
    loading: false,
    message: {
        color: "",
        text: "",
        icon: "",
    },
    user: {
        displayName: "",
        email: "",
        password: "",
        image: undefined,
    }
}

export const REGISTER_PROCESS = "REGISTER_PROCESS";
export const SET_USER = "SET_USER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const CLEAN_STATES = "CLEAN_STATES";

export const registerReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_PROCESS:
            return {
                ...state,
                loading: action.payload,
            }
        case SET_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.name]: action.payload.value,
                },
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
            }
        case REGISTER_FAIL:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
            }
        case CLEAN_STATES:
            return {
                ...state,
                loading: action.payload.loading,
                message: action.payload.message,
            }

        default: return state;
    }
}