import React, { useState } from 'react'
import { Dialog } from '@mui/material'

import CreateNewProduct from '../Form/CreateNewProduct'
import DeleteProduct from '../Form/DeleteProduct';

const AdminSettings = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenCreate = () => {
        setOpenCreate(true);
    };
    const handleCloseCreate = () => {
        setOpenCreate(false);
    };
    const handleOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const handleOpenUpdate = () => {
        setOpenUpdate(true);
    };
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };

  return (
    <>
        <h3>Admin settings</h3>
        <div className='profile__content__admin__settings'>
            <button
                onClick={handleOpenCreate}
                className='profile__content__admin__settings__actions'
            >Create new product</button>
            <Dialog
                open={openCreate}
                onClose={handleCloseCreate}
            >
                <CreateNewProduct handleClose={handleCloseCreate} />
            </Dialog>
        </div>

        <div className='profile__content__admin__settings'>
            <button
                onClick={handleOpenDelete}
                className='profile__content__admin__settings__actions'
            >Delete a product</button>
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
            >
                <DeleteProduct handleClose={handleCloseDelete}/>
            </Dialog>
        </div>

        <div className='profile__content__admin__settings'>
            <button
                onClick={handleOpenUpdate}
                className='profile__content__admin__settings__actions'
            >Update a product</button>
            <Dialog
                open={openUpdate}
                onClose={handleCloseUpdate}
            >
                <div className='form-container'>
                    To update a Product, go to each Product's Details Page
                </div>
            </Dialog>
        </div>
    </>
  )
}

export default AdminSettings