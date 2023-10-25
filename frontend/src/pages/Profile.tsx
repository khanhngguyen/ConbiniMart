import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';

import { logout } from '../redux/reducers/usersReducer';
import UserUpdate from '../components/Form/UserUpdate';
import UserPasswordUpdate from '../components/Form/UserPasswordUpdate';

const Profile = () => {
    const currentUser = useAppSelector(state => state.usersReducer.currentUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAdmin = currentUser?.role;

    const onLogoutHandler = () => {
        dispatch(logout());
    }

    if (!currentUser) navigate("/");
  return (
    <div>
        <h2>Profile</h2>
        <p>Hello {currentUser?.firstName} {currentUser?.lastName}</p>
        {isAdmin ? <p>not admin</p> : <p>is admin</p>}

        <button>
            Edit your profile
        </button>
        <UserUpdate />

        <UserPasswordUpdate />
        <button>
            Change your password
        </button>
        <button 
            onClick={onLogoutHandler}
            // className='button'
        >Log out</button>
    </div>
  )
}

export default Profile