import React from 'react'

const Cart = () => {
  return (
    <section className='favorites'>
      <div className='container'>
        <p className='favorites__title'> -- Favorites -- </p>

        <table className='favorites__table'>
          <thead className='favorites__table__header'>
            <tr className='favorites__table__row'>
              <th className='favorites__table__data--left'>Products</th>
              <th className='favorites__table__data'>Price</th>
              <th className='favorites__table__data'>Amount</th>
              <th className='favorites__table__data'>Total</th>
            </tr>
          </thead>

          <tbody className='favorites__table__body'>
            <tr className='favorites__table__row'>
              <td className='favorites__table__data--left'>product name</td>
              <td className='favorites__table__data'>price</td>
              <td className='favorites__table__data'>amount</td>
              <td className='favorites__table__data'>total</td>
            </tr>

            <tr className='favorites__table__row'>
              <th colSpan={2} className='favorites__table__data--left'>Subtotal</th>
              <td className='favorites__table__data'>subtotal amount</td>
              <td className='favorites__table__data'>subtotal price</td>
            </tr>

            <tr className='favorites__table__row'>
              <th colSpan={2} className='favorites__table__data--left'>Tax</th>
              <td className='favorites__table__data'>24%</td>
              <td className='favorites__table__data'>plus tax</td>
            </tr>

            <tr className='favorites__table__row'>
              <th colSpan={2} className='favorites__table__data--left'>Shipping fee</th>
              <td className='favorites__table__data'>4.99€</td>
              <td className='favorites__table__data'>plus shipping</td>
            </tr>

            <tr className='favorites__table__row'>
              <th colSpan={3} className='favorites__table__data--left'>Total</th>
              <td className='favorites__table__data'>total price</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* <h2>Favorites</h2>
      <ul>
          <li>items</li>
          <li>items</li>
          <li>items</li>
          <li>items</li>
      </ul> */}
    </section>
  )
}

export default Cart