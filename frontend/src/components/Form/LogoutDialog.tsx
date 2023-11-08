import React from 'react'

interface LogoutProps {
    handleClose: () => void;
    logout: () => void;
}

const LogoutDialog = (props: LogoutProps) => {
  return (
    <div className='logout-dialog'>
        <p>Are you sure you want to log out of your account?</p>
        <div className='logout-dialog__actions'>
            <button
                onClick={props.handleClose}
                className='logout-dialog__actions__cancel'
            >Cancel</button>
            <button
                onClick={props.logout}
                className='logout-dialog__actions__logout'
            >Log out</button>
        </div>
    </div>
  )
}

export default LogoutDialog