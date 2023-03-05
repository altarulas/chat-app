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

export const SET_USER = "SET_USER";
export const REGISTER_PROCESS = "REGISTER_PROCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const IMAGE_UPLOAD_FAIL = "IMAGE_UPLOAD_FAIL";
export const VALIDATION_FAIL = "VALIDATION_FAIL";
export const MISSING_INPUTS = "MISSING_INPUTS";
export const IMAGE_NOT_EXIST = "IMAGE_NOT_EXIST";

export const registerReducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.name]: action.payload.value,
                },
            }
        case REGISTER_PROCESS:
            return {
                ...state,
                loading: true,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                message: {
                    color: "green",
                    text: "Successfully registered",
                    icon: "success",
                }
            }
        case IMAGE_UPLOAD_FAIL:
            return {
                ...state,
                loading: false,
                message: {
                    color: "red",
                    text: "Image failed to upload",
                    icon: "error",
                }
            }
        case VALIDATION_FAIL:
            return {
                ...state,
                loading: false,
                message: {
                    color: "red",
                    text: "Information's are not valid",
                    icon: "error",
                }
            }
        case MISSING_INPUTS:
            return {
                ...state,
                loading: false,
                message: {
                    color: "orange",
                    text: "Please fill the inputs",
                    icon: "warning",
                }
            }
        case IMAGE_NOT_EXIST:
            return {
                ...state,
                loading: false,
                message: {
                    color: "orange",
                    text: "Please upload an image",
                    icon: "warning",
                }
            }

        default: return state;
    }
}