import { AUTH_FAIL, AUTH_PROCESS, AUTH_SUCCESS, CLEAN_MESSAGE, CLEAN_STATES, INITIAL_STATE, OTP_FAIL, loginReducer } from "../Hooks/loginReducer";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useReducer, useState } from "react";
import { RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";

import { AuthContext } from "../Context/Auth";
import Loading from "../Components/Loading"
import SMSDialog from "../Components/SMSDialog";
import SnackBar from "../Components/SnackBar";
import { auth } from "../firebase";

const Login = () => {
    const { currentUser } = useContext(AuthContext);
    const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);
    const [sms, setSms] = useState("");

    const authHandler = async () => {
        const email = state.user.email;
        const password = state.user.password;
        dispatch({ type: AUTH_PROCESS, payload: true })

        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: {
                        loading: false,
                        message: {
                            color: "green",
                            text: "Successfully logged in",
                            icon: "success"
                        }
                    }
                })
                setTimeout(() => {
                    navigate("/app");
                }, 2000);
            }).catch(() => {
                dispatch({
                    type: AUTH_FAIL,
                    payload: {
                        loading: false,
                        dialogSMS: false,
                        message: {
                            color: "red",
                            text: "Information's are not correct",
                            icon: "error",
                        }
                    }
                })
                setTimeout(() => {
                    dispatch({
                        type: CLEAN_MESSAGE,
                        payload: {
                            message: {
                                color: "",
                                text: "",
                                icon: "",
                            },
                        }
                    })
                }, 2000);
            })
    }

    const onCaptchVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                { size: "invisible" },
                auth,
            );
        }
    }

    const messageSendHandler = () => {
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;
        const finalPhoneNumber = "+90" + state.user.phoneNumber;

        signInWithPhoneNumber(auth, finalPhoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const OTPHandler = () => {
        window.confirmationResult
            .confirm(sms)
            .then(() => { authHandler() })
            .catch(() => {
                dispatch({
                    type: OTP_FAIL,
                    payload: {
                        loading: false,
                        dialogSMS: false,
                        message: {
                            color: "red",
                            text: "SMS code is not correct",
                            icon: "error",
                        },
                    }
                })
                setTimeout(() => {
                    dispatch({
                        type: CLEAN_MESSAGE,
                        payload: {
                            message: {
                                color: "",
                                text: "",
                                icon: "",
                            },
                        }
                    })
                }, 2000);
            })
    }

    const navigate = useNavigate();
    //checks is there any exist user on database. if it is, navigate to app.
    const loginHandler = async () => {
        const email = state.user.email;
        const password = state.user.password;

        if (currentUser && (email === "" && password === "" && state.user.phoneNumber === "")) {
            navigate("/app");
        } else {
            if ((state.user.phoneNumber.length === 10) && email && password) {
                //setDialog(true);
                dispatch({ type: "OTP_LOGIN_PROCESS", payload: true })
                messageSendHandler();
            } else if (email && password) {
                authHandler();
            } else {
                dispatch({
                    type: AUTH_FAIL, payload: {
                        loading: false,
                        message: {
                            color: "red",
                            text: "Information's are not correct",
                            icon: "error",
                        }
                    }
                })
            }
        }
        setTimeout(() => {
            dispatch({
                type: CLEAN_STATES, payload: {
                    loading: false,
                    message: {
                        color: "",
                        text: "",
                        icon: ""
                    }
                }
            })
        }, 2500);
    }

    return (
        <div id="login-base" className="w-screen h-screen bg-indigo-500 flex items-center justify-center flex-col">
            <span id="title" className="mb-8 font-semibold text-4xl text-gray-200 max-sm:text-2xl">Welcome to Chat App</span>
            <div id="login-form" className="w-108 bg-white rounded-md p-4 max-sm:w-80">
                <div id="form-wrapper" className="flex flex-col w-full h-full px-16 max-sm:px-6">
                    <span className="text-center font-semibold text-3xl my-2 max-sm:text-2xl">
                        Login
                    </span>
                    <TextField
                        name="email"
                        inputProps={{ "data-testid": "email-input" }}
                        margin="normal"
                        id="standard-basic-1"
                        label="E-mail"
                        variant="standard"
                        value={state.user.email}
                        onChange={(e) => {
                            dispatch({
                                type: "SET_USER",
                                payload: {
                                    name: e.target.name,
                                    value: e.target.value,
                                }
                            })
                        }}
                    />
                    <TextField
                        name="password"
                        inputProps={{ "data-testid": "password-input" }}
                        margin="normal"
                        id="password-standard-basic-2"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        onChange={(e) => {
                            /* setUser({ ...user, password: e.target.value }); */
                            dispatch({
                                type: "SET_USER",
                                payload: {
                                    name: e.target.name,
                                    value: e.target.value,
                                }
                            })
                        }}
                    />
                    <div className="mt-4 flex flex-col border-2 border-gray-500 rounded-lg py-4 px-6 max-sm:px-2 max-sm:py-2">
                        <span className="font-bold">Login with SMS verification (optional)</span>
                        <TextField
                            name="phoneNumber"
                            margin="normal"
                            id="phone-standard-basic-3"
                            label="Phone Number"
                            variant="standard"
                            onChange={(e) => {
                                /* setUser({ ...user, phoneNumber: e.target.value }); */
                                dispatch({
                                    type: "SET_USER",
                                    payload: {
                                        name: e.target.name,
                                        value: e.target.value,
                                    }
                                })
                            }} />
                    </div>
                    <Button
                        data-testid="login"
                        color="secondary"
                        onClick={loginHandler}
                        style={{ marginTop: "24px" }}
                        variant="contained">
                        LOGIN
                    </Button>
                    <span className="text-base mt-8 mb-4 text-center">
                        Don't you have an account?
                        <Link
                            className="font-bold max-sm:flex max-sm:justify-center"
                            to="/register"
                            style={{ textDecoration: "none", marginLeft: "7px" }}>
                            Click Here
                        </Link>
                    </span>
                    <div data-testid="loading-wrapper">
                        <Loading loading={state.loading} />
                    </div>
                </div>
            </div>
            <div className="text-gray-300 mt-4 flex items-center max-sm:mt-2 max-sm:flex-row max-sm:text-xs">
                <span className="mr-1">Created By : Altar Ulas |</span>
                <span>linkedin.com/in/ismail-altar-ulas/</span>
            </div>
            {state.message && <SnackBar message={state.message} />}
            {state.dialogSMS && <SMSDialog setSms={setSms} OTPHandler={OTPHandler} />}
            <div id="recaptcha-container"></div>
        </div >
    );
};

export default Login;