import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Loading from "../Utility/Loading"
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();

        const email = user.email
        const password = user.password

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home")
        } catch (error) {
            setLoading(false);
            setError(true);
        }

        setUser({ ...user, email: "" });
        setUser({ ...user, password: "" });
        setLoading(false);
    };
    return (
        <div id="login-base" className="w-screen h-screen bg-indigo-500 flex items-center justify-center flex-row">
            <div id="login-form" className="w-108 bg-white rounded-md p-4 max-sm:w-80">
                <div id="form-wrapper" className="flex flex-col w-full h-full px-16 max-sm:px-6">
                    <span className="text-center font-semibold text-3xl my-4 max-sm:text-2xl">
                        Chat App Login
                    </span>
                    <TextField
                        margin="normal"
                        id="standard-basic-1"
                        label="E-mail"
                        variant="standard"
                        onChange={(e) => {
                            setUser({ ...user, email: e.target.value });
                        }}
                    />
                    <TextField
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
                        onClick={loginHandler}
                        style={{ marginTop: "28px" }}
                        variant="contained">
                        LOGIN
                    </Button>
                    <span className="text-base mt-8 mb-4 text-center">
                        Don't you have an account?
                        <Link
                            className="font-bold"
                            to="/register"
                            style={{ textDecoration: "none", marginLeft: "7px" }}>
                            Click Here
                        </Link>
                    </span>
                    {loading && <div id="svg-wrapper" className="my-4 flex justify-center">
                        <Loading />
                    </div>}
                    {error && <span id="error-wrapper" className="text-lg font-semibold my-4 flex justify-center text-red-600">
                        Login is Failed
                    </span>}
                </div>
            </div>
        </div>
    );
};

export default Login;