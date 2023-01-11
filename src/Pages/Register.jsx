import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Add from "../Images/add.png";
import { useState } from "react";

const Register = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            setLoading(true);
            // Create user with auth
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // Create storage for image with unique id
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            // Upload func to upload image
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/home");
                    } catch (err) {
                        setLoading(false);
                        setError(true);
                    }
                });
            });
        } catch (err) {
            setLoading(false);
            setError(true);
        }

        setLoading(false);
    }
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Chat App Register</span>
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder="display name" />
                    <input required type="email" placeholder="email" />
                    <input required type="password" placeholder="password" />
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign up</button>
                    {loading && "Please wait..."}
                    {error && <span>Something went wrong</span>}
                </form>
                <p>
                    You do have an account? <Link to="/" style={{ textDecoration: "none", marginLeft: "7px" }}>Click Here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;