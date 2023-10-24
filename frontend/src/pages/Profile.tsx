import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/usersReducer';

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
        <button onClick={onLogoutHandler}>log out</button>
    </div>
  )
}

export default Profile