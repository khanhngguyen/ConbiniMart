import React from 'react'

import { useAppSelector } from '../hooks/useAppSelector'

const Orders = () => {
    const { currentUser } = useAppSelector(state => state.usersReducer);
    const { orders } = useAppSelector(state => state.cartReducer);

    if (!currentUser) return(
        <div className='orders__not-log-in'>
            <p>Please log in to see your orders</p>
        </div>
    )
    
  return (
    <section className='favorites'>
      <div className='container'>
        <p className='favorites__title'> --- All orders --- </p>

        <p className='orders__total'>Total orders: {orders.length}</p>
        {/* { orders.length === 0 && <p>No orders</p>} */}

        { orders.map(order => (
          <table
            key={order.id.toString()}
            className='favorites__table orders'
          >
            <tbody className='favorites__table__body'>
              <tr className='favorites__table__row'>
                <td className='favorites__table__data--left' colSpan={2}>
                  Status: {order.orderStatus ? "Shipped" : "Pending"}
                </td>
                <td className='favorites__table__data' colSpan={2}>
                  Total: {order.orderProducts.length} product(s)
                </td>
              </tr>

              <tr className='favorites__table__header'>
                <td className='favorites__table__data--left'>Products</td>
                <td className='favorites__table__data'>Price</td>
                <td className='favorites__table__data'>Amount</td>
                <td className='favorites__table__data'>Total</td>
              </tr>

              { order.orderProducts.map(item => (
                <tr className='favorites__table__row'>
                  <td className='favorites__table__data--left'>{item.product.title}</td>
                  <td className='favorites__table__data'>{item.product.price} €</td>
                  <td className='favorites__table__data'>{item.amount}</td>
                  <td className='favorites__table__data'>{item.product.price * item.amount} €</td>
                </tr>
              ))}

            </tbody>

          </table>
        ))}

      </div>
      
      {/* <div>
        { orders.length === 0 && <p>No orders</p>}

        { orders.map(order => (
          <ul key={order.id.toString()}>
            <li>{order.orderStatus ? "Shipped" : "Pending"}</li>
            <li>Total: {order.orderProducts.length} product(s)</li>

            {order.orderProducts.map(item => (
              <ul key={item.product.id.toString()}>
                <li>{item.product.title}</li>
                <li>{item.amount}</li>
                <li>{item.product.price}</li>
              </ul>
            ))}

            <br />
          </ul>
        ))}

      </div> */}

    </section>
  )
}

export default Orders