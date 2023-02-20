import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRef, useState } from "react";

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Loading from "../Components/Loading";
import SnackBar from "../Components/SnackBar";

// TODO: display message for correct or incorrect login with animation

const Register = () => {
    const [message, setMessage] = useState({ color: "", text: "", icon: "" });
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        displayName: "",
        email: "",
        password: "",
        image: undefined,
    });

    const handleImageChange = (event) => {
        setUser({ ...user, image: event.target.files[0] });
    };

    const navigate = useNavigate();
    const imageRef = useRef(null);
    // Makes user register
    const registerHandler = async () => {
        const displayName = user.displayName
        const email = user.email
        const password = user.password
        const image = user.image

        if (image) {
            try {
                setLoading(true);
                // Creates user 
                if (displayName) {
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
                                setMessage({
                                    color: "green",
                                    text: "Successfully registered",
                                    icon: "success",
                                });
                                setTimeout(() => {
                                    navigate("/app");
                                }, 2000);
                            } catch {
                                setLoading(false);
                                setMessage({
                                    color: "red",
                                    text: "Image failed to upload",
                                    icon: "error",
                                });
                            }
                        });
                    });
                } else {
                    setMessage({
                        color: "red",
                        text: "Incorrect or missing inputs",
                        icon: "error",
                    });
                }
            } catch {
                setLoading(false);
                setMessage({
                    color: "red",
                    text: "Incorrect or missing inputs",
                    icon: "error",
                });
            }
        } else {
            setMessage({
                color: "red",
                text: "Image failed to upload or there is no image",
                icon: "error",
            });
        }

        setLoading(false);
        setTimeout(() => {
            setMessage({
                color: "",
                text: "",
                icon: "",
            });
        }, 2500)
    }

    return (
        <div id="register-base" className="w-screen h-screen bg-indigo-500 flex items-center justify-center flex-row">
            <div id="register-form" className="w-108 bg-white rounded-md p-4 max-sm:w-80">
                <div id="form-wrapper" className="flex flex-col w-full h-full px-16 max-sm:px-6">
                    <span className="text-center font-semibold text-3xl my-4 max-sm:text-2xl">
                        Sign Up
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
                        <input style={{ display: "none" }} ref={imageRef} type="file" id="file" onChange={handleImageChange} />
                        <label htmlFor="file" className="flex items-center cursor-pointer">
                            <AccountBoxIcon sx={{
                                width: "50px",
                                height: "50px",
                            }} />
                            <span className="ml-4 font-semibold">Add an avatar</span>
                        </label>
                    </div>
                    <Button
                        color="secondary"
                        onClick={registerHandler}
                        sx={{ marginTop: "28px" }}
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
                            <Loading loading={loading} />
                        </div>}
                    </div>
                </div>
            </div>
            {message && <SnackBar message={message} />}
        </div>
    );
};

export default Register;