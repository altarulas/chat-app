import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";

import { AuthContext } from "../Context/Auth";
import Loading from "../Components/Loading"
import SMSDialog from "../Components/SMSDialog";
import SnackBar from "../Components/SnackBar";
import { auth } from "../firebase";

const Login = () => {
    const { currentUser } = useContext(AuthContext);

    const [dialog, setDialog] = useState(false);
    const [sms, setSMS] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [message, setMessage] = useState({ color: "", text: "", icon: "" });
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const authHandler = async () => {
        const email = user.email;
        const password = user.password;
        setLoading(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setMessage({
                    color: "green",
                    text: "Successfully logged in",
                    icon: "success",
                });
                setTimeout(() => {
                    navigate("/app");
                }, 2000);
            }).catch(() => {
                setDialog(false);
                setLoading(false);
                setMessage({
                    color: "red",
                    text: "Information's are not correct",
                    icon: "error",
                });
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
        const finalPhoneNumber = "+90" + phoneNumber;

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
                setLoading(false);
                setDialog(false);
                setMessage({
                    color: "red",
                    text: "SMS code is not correct",
                    icon: "error",
                });
            })
    }

    const navigate = useNavigate();
    //checks is there any exist user on database. if it is, navigate to app.
    const loginHandler = async () => {
        const email = user.email;
        const password = user.password;

        if (currentUser && (email === "" && password === "" && phoneNumber === "")) {
            navigate("/app");
        } else {
            if ((phoneNumber.length === 10) && email && password) {
                setDialog(true);
                messageSendHandler();
            } else if (email && password) {
                authHandler();
            } else {
                setMessage({
                    color: "red",
                    text: "Information's are not correct",
                    icon: "error",
                });
                setLoading(false);
            }
        }

        setLoading(false);
        setTimeout(() => {
            setMessage({
                color: "",
                text: "",
                icon: "",
            });
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
                        inputProps={{ "data-testid": "email-input" }}
                        margin="normal"
                        id="standard-basic-1"
                        label="E-mail"
                        variant="standard"
                        value={user.email}
                        onChange={(e) => {
                            setUser({ ...user, email: e.target.value });
                        }}
                    />
                    <TextField
                        inputProps={{ "data-testid": "password-input" }}
                        margin="normal"
                        id="password-standard-basic-2"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        onChange={(e) => {
                            setUser({ ...user, password: e.target.value });
                        }}
                    />
                    <div className="mt-4 flex flex-col border-2 border-gray-500 rounded-lg py-4 px-6 max-sm:px-2 max-sm:py-2">
                        <span className="font-bold">Login with SMS verification (optional)</span>
                        <TextField
                            margin="normal"
                            id="phone-standard-basic-3"
                            label="Phone Number"
                            variant="standard"
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
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
                        <Loading loading={loading} />
                    </div>
                </div>
            </div>
            <div className="text-gray-300 mt-4 flex items-center max-sm:mt-2 max-sm:flex-row max-sm:text-xs">
                <span className="mr-1">Created By : Altar Ulas |</span>
                <span>linkedin.com/in/ismail-altar-ulas/</span>
            </div>
            {message && <SnackBar message={message} />}
            {!dialog && <SMSDialog setSMS={setSMS} OTPHandler={OTPHandler} />}
            <div id="recaptcha-container"></div>
        </div >
    );
};

export default Login;