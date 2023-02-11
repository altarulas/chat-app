import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ExistChatsMobile from './ExistChatsMobile';
import Search from './Search';

export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color='secondary' onClick={handleClickOpen}>
                <img src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/null/external-friends-user-tanah-basah-basic-outline-tanah-basah.png" alt='' />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className='bg-gray-400'>
                    <DialogContent>
                        <Search />
                        <div onClick={handleClose}>
                            <ExistChatsMobile />
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    );
}