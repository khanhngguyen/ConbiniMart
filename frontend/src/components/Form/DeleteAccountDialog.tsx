import React from 'react'

interface DeleteAccountProps {
    handleClose: () => void;
}

const DeleteAccountDialog = (props: DeleteAccountProps) => {
  return (
    <div className='delete-dialog'>
        <p>Are you sure you want to delete your account?</p>
        <div className='delete-dialog__actions'>
            <button
                onClick={props.handleClose}
                className='delete-dialog__actions__cancel'
            >Cancel</button>
            <button
                className='delete-dialog__actions__delete'
            >Delete</button>
        </div>
    </div>
  )
}

export default DeleteAccountDialog