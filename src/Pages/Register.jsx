import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Add from "../Images/add.png";
import Loading from "../Utility/Loading";
import { useState } from "react";

const Register = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        file: File,
    });


    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();

        const name = user.name
        const email = user.email
        const password = user.password
        const file = user.file

        try {
            setLoading(true);
            // Create user with auth
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // Create storage for image with unique id
            const date = new Date().getTime();
            const storageRef = ref(storage, `${name + date}`);

            // Upload func to upload image
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            name,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            name,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/app");
                    } catch (error) {
                        setLoading(false);
                        setError(true);
                    }
                });
            });
        } catch (error) {
            setLoading(false);
            setError(true);
        }

        setUser({ ...user, name: "" });
        setUser({ ...user, email: "" });
        setUser({ ...user, password: "" });
        setUser({ ...user, file: null });
        setLoading(false);
    }

    return (
        <div id="login-base" className="w-screen h-screen bg-indigo-500 flex items-center justify-center flex-row">
            <div id="login-form" className="w-108 bg-white rounded-md p-4 max-sm:w-80">
                <div id="form-wrapper" className="flex flex-col w-full h-full px-16 max-sm:px-6">
                    <span className="text-center font-semibold text-3xl my-4 max-sm:text-2xl">
                        Chat App Sign Up
                    </span>
                    <TextField
                        margin="normal"
                        id="standard-basic-3"
                        label="Name"
                        variant="standard"
                        onChange={(e) => {
                            setUser({ ...user, name: e.target.value });
                        }}
                    />
                    <TextField
                        margin="normal"
                        id="standard-basic-4"
                        label="E-mail"
                        variant="standard"
                        onChange={(e) => {
                            setUser({ ...user, email: e.target.value });
                        }}
                    />
                    <TextField
                        margin="normal"
                        id="password-standard-basic-5"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        onChange={(e) => {
                            setUser({ ...user, password: e.target.value });
                        }}
                    />
                    <div id="image-upload" className="w-44 mt-4">
                        <input style={{ display: "none" }} type="file" id="file" />
                        <label htmlFor="file" className="flex items-center cursor-pointer">
                            <img src={Add} alt="" className="bg-indigo-600 rounded-md" />
                            <span className="ml-4 font-semibold">Add an avatar</span>
                        </label>
                    </div>
                    <Button
                        color="secondary"
                        onClick={registerHandler}
                        style={{ marginTop: "28px" }}
                        variant="contained">
                        SIGN UP
                    </Button>
                    <span className="text-base mt-8 mb-4 text-center">
                        Do you have an account?
                        <Link
                            className="font-bold"
                            to="/"
                            style={{ textDecoration: "none", marginLeft: "7px" }}>
                            Click Here
                        </Link>
                    </span>
                    {loading && <div id="svg-wrapper" className="my-4 flex justify-center">
                        <Loading />
                    </div>}
                    {error && <span id="error-wrapper" className="text-lg font-semibold my-4 flex justify-center text-red-600">
                        Sign Up is Failed
                    </span>}
                </div>
            </div>
        </div>
    );
};

export default Register;