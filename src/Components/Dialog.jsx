import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ExistChats from './ExistChats';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
            <Button sx={{
                bgcolor: "white",
                "&:hover": {
                    bgcolor: "gray"
                }
            }} variant="contained" color='primary' onClick={handleClickOpen}>
                <PersonAddIcon fontSize='medium' sx={{
                    color: "black"
                }} />
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
                            <ExistChats />
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    );
}