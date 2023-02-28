import React, { useEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';

const Loading = (props) => {
  const { loading } = props;
  const [open = false, setOpen] = useState(false);

  useEffect(() => {
    setOpen(loading);
  }, [loading])

  return (
    <>
      <Dialog
        sx={{ opacity: "0.8" }}
        open={open}
      >
        <div className='p-2 px-4 bg'>
          <CircularProgress />
        </div>
      </Dialog>
    </>
  );
}

export default Loading;
