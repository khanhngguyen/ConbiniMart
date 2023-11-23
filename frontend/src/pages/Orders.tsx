import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector'

const Orders = () => {
    const { currentUser } = useAppSelector(state => state.usersReducer);

    if (!currentUser) return(
        <div className='orders__not-log-in'>
            <h4>Please log in to see your orders</h4>
        </div>
    )
    
  return (
    <div>All orders here</div>
  )
}

export default Orders