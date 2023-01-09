import { Button, TextField } from "@mui/material";

import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Register</span>
                <form>
                    <TextField id="standard-basic-1" label="name" variant="standard" />
                    <TextField id="standard-basic-2" label="e-mail" variant="standard" />
                    <TextField
                        id="outlined-password-input-1"
                        label="password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                    />
                    <input required style={{ display: "none" }} type="file" id="file" />
                    <label style={{ width: "150px" }} htmlFor="file">
                        <img
                            src="https://img.icons8.com/color-glass/48/null/guest-male.png"
                            alt=""
                        />
                        <span style={{ fontSize: "17px", margin: "15px 0px" }}>
                            Add an avatar
                        </span>
                    </label>
                    <Button variant="contained">SIGN UP</Button>
                </form>
                <p style={{ fontSize: "16px" }}>
                    Do you have an account?
                    <Link to="/">Click Here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;