import React, { useState } from 'react'
import { Dialog } from '@mui/material'

import CreateNewProduct from '../Form/CreateNewProduct'

const AdminSettings = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

  return (
    <>
        <h3>Admin settings</h3>
        <div className='profile__content__admin__settings'>
            <button
                onClick={handleOpen}
                className='profile__content__admin__settings__actions'
            >Create new product</button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <CreateNewProduct handleClose={handleClose} />
            </Dialog>
        </div>

        <div className='profile__content__admin__settings'>
            <button
                className='profile__content__admin__settings__actions'
            >Delete a product</button>
        </div>

        <div className='profile__content__admin__settings'>
            <button
                className='profile__content__admin__settings__actions'
            >Update a product</button>
        </div>
    </>
  )
}

export default AdminSettings