import React, { useEffect, useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const SnackBar = (props) => {
    const { message } = props;
    const [showSnackbar, setShowSnackbar] = useState(true);

    let text;
    if (message === "success") {
        text = "Information's are correct";
    } else if (message === "error") {
        text = "Information's are not correct";
    } else {
        text = "Something went wrong";
    }

    useEffect(() => {
        setShowSnackbar(true);
    }, [message]);

    return (
        showSnackbar && (
            <div id='snackbar' className={`fixed bottom-4 left-4 text-white p-4 rounded-md 
            ${(message === "success") ? ("bg-green-700") : ("bg-red-700")}`}>
                <span>
                    {message === "success" ? (<CheckIcon />) : (<HighlightOffIcon />)}
                    <span className='ml-4'>{text}</span>
                </span>
            </div >
        )
    );
};

export default SnackBar;
