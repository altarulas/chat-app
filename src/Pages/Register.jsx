import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRef, useState } from "react";

import Add from "../Images/add.png";
import Loading from "../Utility/Loading";

// TODO: display message for correct or incorrect login with animation

const Register = () => {
    const [serverError, setServerError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        displayName: "",
        email: "",
        password: "",
        image: undefined,
    });

    const navigate = useNavigate();
    const imageRef = useRef(null);
    // Makes user register
    const registerHandler = async () => {
        const displayName = user.displayName
        const email = user.email
        const password = user.password
        const image = imageRef.current.files[0];

        try {
            setLoading(true);
            // Creates user 
            const response = await createUserWithEmailAndPassword(auth, email, password);
            // Creates storage for images with unique id
            const date = new Date().getTime();
            //Creates a reference to a location within the storage service, using the concatenated string as the path
            const storageRef = ref(storage, `${displayName + date}`);
            // Uploads images
            await uploadBytesResumable(storageRef, image).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(response.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //Creates user on firestore
                        await setDoc(doc(db, "users", response.user.uid), {
                            uid: response.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        //Creates empty user chats on firestore
                        await setDoc(doc(db, "userChats", response.user.uid), {});
                        navigate("/app");
                    } catch (error) {
                        setLoading(false);
                        setServerError(true);
                    }
                });
            });
        } catch (error) {
            setLoading(false);
            setServerError(true);
        }
        setUser({ ...user, displayName: "", email: "", password: "", file: null });
        setLoading(false);
    }

    return (
        <div id="register-base" className="w-screen h-screen bg-indigo-500 flex items-center justify-center flex-row">
            <div id="register-form" className="w-108 bg-white rounded-md p-4 max-sm:w-80">
                <div id="form-wrapper" className="flex flex-col w-full h-full px-16 max-sm:px-6">
                    <span className="text-center font-semibold text-3xl my-4 max-sm:text-2xl">
                        Chat App Sign Up
                    </span>
                    <TextField
                        inputProps={{ "data-testid": "name-input" }}
                        margin="normal"
                        id="standard-basic-3"
                        label="Name"
                        variant="standard"
                        onChange={(e) => {
                            setUser({ ...user, displayName: e.target.value });
                        }}
                    />
                    <TextField
                        inputProps={{ "data-testid": "email-input" }}
                        margin="normal"
                        id="standard-basic-4"
                        label="E-mail"
                        variant="standard"
                        onChange={(e) => {
                            setUser({ ...user, email: e.target.value });
                        }}
                    />
                    <TextField
                        inputProps={{ "data-testid": "password-input" }}
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
                    <div data-testid="image-upload" id="image-upload" className="w-44 mt-4">
                        <input style={{ display: "none" }} ref={imageRef} type="file" id="file" />
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
                            className="font-bold max-sm:flex max-sm:justify-center"
                            to="/"
                            style={{ textDecoration: "none", marginLeft: "7px" }}>
                            Click Here
                        </Link>
                    </span>
                    <div data-testid="loading-wrapper">
                        {loading && <div data-testid="loading" id="svg-wrapper" className="my-4 flex justify-center">
                            <Loading />
                        </div>}
                    </div>
                    {serverError && <span id="error-wrapper" className="text-lg font-semibold my-4 flex justify-center text-red-600">
                        Sign Up is Failed
                    </span>}
                </div>
            </div>
        </div>
    );
};

export default Register;