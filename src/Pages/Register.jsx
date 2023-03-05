import { Button, TextField } from "@mui/material";
import { IMAGE_NOT_EXIST, IMAGE_UPLOAD_FAIL, INITIAL_STATE, MISSING_INPUTS, REGISTER_PROCESS, REGISTER_SUCCESS, SET_USER, VALIDATION_FAIL, registerReducer } from "../Hooks/registerReducer";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useReducer, useRef } from "react";

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Loading from "../Components/Loading";
import SnackBar from "../Components/SnackBar";

// TODO: display message for correct or incorrect login with animation

const Register = () => {
    const [state, dispatch] = useReducer(registerReducer, INITIAL_STATE);

    const handleImageChange = (e) => {
        dispatch({
            type: SET_USER,
            payload: {
                name: e.target.name,
                value: e.target.files[0],
            }
        })
    };

    const navigate = useNavigate();

    const imageRef = useRef(null);
    // Makes user register
    const registerHandler = async () => {
        const displayName = state.user.displayName
        const email = state.user.email
        const password = state.user.password
        const image = state.user.image

        if (image) {
            dispatch({ type: REGISTER_PROCESS });
            // Creates user 
            if (displayName && email && password) {
                try {
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
                                await setDoc(doc(db, "userChats", response.user.uid), {})

                                setTimeout(() => {
                                    dispatch({ type: REGISTER_SUCCESS })
                                }, 500)

                                setTimeout(() => {
                                    navigate("/app");
                                }, 2000)

                            } catch {
                                dispatch({ type: IMAGE_UPLOAD_FAIL })
                            }
                        });
                    });
                } catch {
                    dispatch({ type: VALIDATION_FAIL })
                }
            } else {
                dispatch({ type: MISSING_INPUTS })
            }
        } else {
            dispatch({ type: IMAGE_NOT_EXIST })
        }
    }

    return (
        <div id="register-base" className="w-screen h-screen bg-indigo-500 flex items-center justify-center flex-row">
            <div id="register-form" className="w-108 bg-white rounded-md p-4 max-sm:w-80">
                <div id="form-wrapper" className="flex flex-col w-full h-full px-16 max-sm:px-6">
                    <span className="text-center font-semibold text-3xl my-4 max-sm:text-2xl">
                        Sign Up
                    </span>
                    <TextField
                        name="displayName"
                        inputProps={{ "data-testid": "name-input" }}
                        margin="normal"
                        id="standard-basic-3"
                        label="Name"
                        variant="standard"
                        onChange={(e) => {
                            dispatch({
                                type: SET_USER,
                                payload: {
                                    name: e.target.name,
                                    value: e.target.value,
                                }
                            })
                        }}
                    />
                    <TextField
                        name="email"
                        inputProps={{ "data-testid": "email-input" }}
                        margin="normal"
                        id="standard-basic-4"
                        label="E-mail"
                        variant="standard"
                        onChange={(e) => {
                            dispatch({
                                type: SET_USER,
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
                        id="password-standard-basic-5"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        onChange={(e) => {
                            dispatch({
                                type: SET_USER,
                                payload: {
                                    name: e.target.name,
                                    value: e.target.value,
                                }
                            })
                        }}
                    />
                    <div data-testid="image-upload" id="image-upload" className="w-44 mt-4">
                        <input name="image" style={{ display: "none" }} ref={imageRef} type="file" id="file" onChange={handleImageChange} />
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
                        {state.loading && <div data-testid="loading" id="svg-wrapper" className="my-4 flex justify-center">
                            <Loading loading={state.loading} />
                        </div>}
                    </div>
                </div>
            </div>
            {state.message && <SnackBar message={state.message} />}
        </div>
    );
};

export default Register;