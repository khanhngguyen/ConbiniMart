import React from 'react'

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { deleteUser } from '../../redux/reducers/usersReducer';

interface DeleteAccountProps {
    handleClose: () => void;
}

const DeleteAccountDialog = (props: DeleteAccountProps) => {
    const { currentUser } = useAppSelector(state => state.usersReducer);
    const dispatch = useAppDispatch();

    const onDeleteHandler = () => {
        if (currentUser) {
            dispatch(deleteUser(currentUser));
            props.handleClose();
        }
    }

  return (
    <div className='delete-dialog'>
        <p>Are you sure you want to delete your account?</p>
        <div className='delete-dialog__actions'>
            <button
                onClick={props.handleClose}
                className='delete-dialog__actions__cancel'
            >Cancel</button>
            <button
                onClick={onDeleteHandler}
                className='delete-dialog__actions__delete'
            >Delete</button>
        </div>
    </div>
  )
}

export default DeleteAccountDialog