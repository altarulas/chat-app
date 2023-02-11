import * as React from 'react';

import { AuthContext } from '../Context/Auth';
import { ChatContext } from '../Context/Chat';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function ProfileMobile() {
    const { currentUser } = React.useContext(AuthContext);
    const { dispatch } = React.useContext(ChatContext);

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const resetSelected = () => {
        dispatch({ type: "LOGOUT" });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        signOut(auth)
        navigate("/");
        resetSelected();
    };


    return (
        <div>
            <div
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="text-white cursor-pointer"
            >
                <img className="w-10 h-10 object-cover rounded-xl mr-4" src={currentUser.photoURL} alt="" />
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}