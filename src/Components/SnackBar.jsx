import React, { useEffect, useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WarningIcon from '@mui/icons-material/Warning';

const SnackBar = (props) => {
    const { message } = props;
    const [showSnackbar, setShowSnackbar] = useState();

    const color = message.color;
    const text = message.text;
    const icon = message.icon;

    useEffect(() => {
        setShowSnackbar(true);
        const timeoutId = setTimeout(() => {
            setShowSnackbar(false);
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [message]);

    return (
        showSnackbar && (
            <div id='snack-bar'
                className={`fixed bottom-4 left-4 text-white p-4 rounded-md ${(color === "green") && "bg-green-700"} ${(color === "red") && "bg-red-700"} ${(color === "orange") && "bg-orange-500"}`}>
                <span id='message'>
                    {icon === "success" && <CheckIcon />}
                    {icon === "error" && <HighlightOffIcon />}
                    {icon === "warning" && <WarningIcon />}
                    <span className='ml-4'>{text}</span>
                </span>
            </div >
        )
    );
};

export default SnackBar;
