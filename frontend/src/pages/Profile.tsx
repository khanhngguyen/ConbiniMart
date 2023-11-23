import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@mui/material';

import { logout } from '../redux/reducers/usersReducer';
import UserUpdate from '../components/Form/UserUpdate';
import UserPasswordUpdate from '../components/Form/UserPasswordUpdate';
import DeleteAccountDialog from '../components/Form/DeleteAccountDialog';
import LogoutDialog from '../components/Form/LogoutDialog';
import AdminSettings from '../components/Profile Page/AdminSettings';

const Profile = () => {
    const [update, setUpdate] = useState(false);
    const [password, setPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);

    const currentUser = useAppSelector(state => state.usersReducer.currentUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAdmin = currentUser?.role;

    const onLogoutHandler = () => {
        dispatch(logout());
    }

    const toggleUpdate = () => {
        setUpdate(!update);
    }
    const togglePasswordUpdate = () => {
        setPassword(!password);
    }
    const handleDeleteOpen = () => {
        setOpen(true);
    };
    const handleDeleteClose = () => {
        setOpen(false);
    };
    const handleLogoutOpen = () => {
        setOpenLogout(true);
    }
    const handleLogoutClose = () => {
        setOpenLogout(false);
    }

    useEffect(() => {
        if (!currentUser) navigate("/");
    }, [navigate, currentUser])

  return (
    <div className='profile'>
        <h2>Profile</h2>
        <div className='profile__content'>
            <div className='profile__content__user'>
                <figure>
                    {currentUser?.avatar 
                        ? <img src={currentUser?.avatar} alt='user avatar' />
                        : <img src='https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg' alt='user avatar' />
                    }
                </figure>
                <p className='profile__content__user__name'>
                    {currentUser?.firstName} {currentUser?.lastname}
                </p>

                <div className='profile__content__user__orders'>
                    <h3>Orders</h3>
                    <div className='profile__content__user__orders__actions'>
                        <button>All orders</button>
                    </div>
                </div>

                <div className='profile__content__user__settings'>
                    <h3>Profile settings</h3>
                    <div className='profile__content__user__settings__actions'>
                        <button 
                            className='profile__content__user__settings__actions__title'
                            onClick={toggleUpdate}
                        >
                            Edit information
                        </button>
                        <UserUpdate display={update} toggleUpdate={toggleUpdate}/>
                    </div>

                    <div className='profile__content__user__settings__actions'>
                        <button 
                            className='profile__content__user__settings__actions__title'
                            onClick={togglePasswordUpdate}
                        >
                            Change password
                        </button>
                        <UserPasswordUpdate display={password} togglePasswordUpdate={togglePasswordUpdate}/>
                    </div>

                    <div className='profile__content__user__settings__actions'>
                        <button
                            className='profile__content__user__settings__actions__title'
                            onClick={handleDeleteOpen}
                        >
                            Delete account
                        </button>
                        <Dialog
                            open={open}
                            onClose={handleDeleteClose}
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                        >
                            <DeleteAccountDialog
                                handleClose={handleDeleteClose}
                            />
                        </Dialog>

                    </div>

                    <div className='profile__content__user__settings__actions'>
                        <button 
                            className='profile__content__user__settings__actions__title'
                            onClick={handleLogoutOpen}
                        >Log out</button>
                        <Dialog
                            open={openLogout}
                            onClose={handleLogoutClose}
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                        >
                            <LogoutDialog
                                handleClose={handleLogoutClose}
                                logout={onLogoutHandler}
                            />
                        </Dialog>
                    </div>

                </div>
            </div>

            <div className='profile__content__admin'>
                {isAdmin ? <></> : <AdminSettings />}
            </div>
        </div>
    </div>
  )
}

export default Profile