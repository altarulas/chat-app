import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SlideDialog(props) {
    const { setSMS, OTPHandler } = props;
    const [countdown, setCountdown] = React.useState(60);
    const [open, setOpen] = React.useState(true);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            }
        }, 1000);

        if (countdown === 0) {
            setOpen(false);
        }

        return () => clearInterval(interval);
    }, [countdown]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <div className='text-2xl text-center mt-4'>
                    <span>Enter your SMS code</span>
                    <span className='ml-2'>({countdown})</span>
                </div>
                <div className='pt-4 pb-8 px-8 flex items-center'>
                    <TextField
                        sx={{ marginRight: "20px" }}
                        margin="normal"
                        id="code-standard-basic-3"
                        label="Enter SMS code"
                        variant="standard"
                        onChange={(e) => {
                            setSMS(e.target.value);
                        }}
                    />
                    <Button
                        sx={{ marginTop: "20px" }}
                        color="primary"
                        onClick={OTPHandler}
                        variant="contained">
                        VERIFY
                    </Button>
                </div>
            </Dialog>
        </div>
    );
}