import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";

import { AuthContext } from "../Context/Auth";
import Loading from "../Components/Loading"
import SnackBar from "../Components/SnackBar";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const { currentUser } = useContext(AuthContext);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    //checks is there any exist user on database. if it is, navigate to app.
    const loginHandler = async () => {
        if (currentUser) {
            navigate("/app");
        }

        const email = user.email;
        const password = user.password;

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password).then(() => {
                setMessage("success");
                setTimeout(() => {
                    navigate("/app");
                }, 2500);
            });
        } catch {
            setMessage("error");
            setLoading(false);
        }

        setUser({ ...user, email: "", password: "" });
        setLoading(false);

        setTimeout(() => {
            setMessage("")
        }, 2500);
    };

    return (
        <div id="login-base" className="w-screen h-screen bg-indigo-500 flex items-center justify-center flex-col">
            <span id="title" className="mb-12 font-semibold text-4xl text-gray-200 max-sm:text-3xl">Welcome to Chat App</span>
            <div id="login-form" className="w-108 bg-white rounded-md p-4 max-sm:w-80">
                <div id="form-wrapper" className="flex flex-col w-full h-full px-16 max-sm:px-6">
                    <span className="text-center font-semibold text-3xl my-4 max-sm:text-2xl">
                        Login
                    </span>
                    <TextField
                        inputProps={{ "data-testid": "email-input" }}
                        margin="normal"
                        id="standard-basic-1"
                        label="E-mail"
                        variant="standard"
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
                    <Button
                        data-testid="login"
                        color="secondary"
                        onClick={() => {
                            loginHandler();
                        }}
                        style={{ marginTop: "28px" }}
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
                        {loading && <div data-testid="loading" className="my-4 flex justify-center">
                            <Loading />
                        </div>}
                    </div>
                </div>
            </div>
            <span className="text-gray-300 mt-10">
                Created By: Altar Ulas - linkedin.com/in/ismail-altar-ulas/
            </span>
            {message && <SnackBar message={message} />}
        </div>
    );
};

export default Login;