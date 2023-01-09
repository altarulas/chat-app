import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

const Login = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Login</span>
                <form>
                    <TextField id="standard-basic" label="e-mail" variant="standard" />
                    <TextField
                        id="outlined-password-input-2"
                        label="password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                    />
                    <Button variant="contained">SIGN IN</Button>
                </form>
                <p style={{ fontSize: "16px" }}>Don't have an account?</p>{" "}
                <Link to="/register">Click Here</Link>
            </div>
        </div>
    );
};

export default Login;