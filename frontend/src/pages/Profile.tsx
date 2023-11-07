import React, { useEffect } from 'react'
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

    useEffect(() => {
        if (!currentUser) navigate("/");
    }, [navigate, currentUser])

  return (
    <div className='profile'>
        <h2>Profile</h2>
        <div className='profile__content'>
            <div className='profile__content__user'>
                <p>Hello {currentUser?.firstName} {currentUser?.lastName}</p>
                {isAdmin ? <p>not admin</p> : <p>is admin</p>}

                <div className='profile__content__user__actions'>
                    <button>
                        Edit your profile
                    </button>
                    <UserUpdate />

                    <UserPasswordUpdate />
                    <button>
                        Change your password
                    </button>
                </div>

            </div>

            <button 
                onClick={onLogoutHandler}
            >Log out</button>
        </div>
    </div>
  )
}

export default Profile