import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home")
        } catch (error) {
            setLoading(false);
            setError(true);
        }
        setLoading(false);
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Chat App Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button>LOGIN</button>
                    {loading && "Please wait..."}
                    {error && <span>Something went wrong</span>}
                </form>
                <p>
                    You don't have an account?
                    <Link to="/register" style={{ textDecoration: "none", marginLeft: "7px" }} >Click Here</Link>
                </p>
            </div>
            <span className="logo">CI/CD is working!!!</span>
            <span className="logo">CI/CD is working...</span>
        </div>
    );
};

export default Login;