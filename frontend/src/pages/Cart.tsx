import React from 'react'
import { DeleteForeverOutlined, DeleteOutlineOutlined, AddCircleOutlineOutlined, RemoveOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { decreaseAmount, emptyCart, increaseAmount, removeFromCart } from '../redux/reducers/cartReducer'

const Cart = () => {
  const { items, totalAmount, totalPrice } = useAppSelector(state => state.cartReducer);
  const { currentUser } = useAppSelector(state => state.usersReducer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  }
  const handleCheckout = () => {
    if (!currentUser) {
      alert("Please log in to check out");
      navigate("/login");
    } else {
      navigate("/orders");
    }
  }

  return (
    <section className='cart'>
      <div className='container'>
        <p className='cart__title'> -- Cart -- </p>

        <table className='cart__table'>
          <thead className='cart__table__header'>
            <tr className='cart__table__row'>
              <th className='cart__table__data--left'>Products</th>
              <th className='cart__table__data'>Price</th>
              <th className='cart__table__data'>Amount</th>
              <th className='cart__table__data'>Total</th>
            </tr>
          </thead>

          <tbody className='cart__table__body'>
            {/* <tr className='cart__table__row'>
              <td className='cart__table__data--left'>product name</td>
              <td className='cart__table__data'>price</td>
              <td className='cart__table__data'>amount</td>
              <td className='cart__table__data'>total</td>
            </tr> */}

            {items.length === 0 && 
              <tr className='cart__table__row'>
                <td colSpan={4} className='cart__table__data--middle'>Cart is empty</td>
              </tr>
            }

            {items.map(item => (
              <tr key={item.id.toString()} className='cart__table__row'>
                <td className='cart__table__data--left'>
                  <NavLink to={`/products/${item.id.toString()}`}>{item.title}</NavLink>
                  <button
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    <Badge>
                      <DeleteOutlineOutlined fontSize='large' />
                    </Badge>
                  </button>
                </td>
                <td className='cart__table__data'>{item.price} €</td>
                <td className='cart__table__data'>
                  <button
                    onClick={() => dispatch(decreaseAmount(item.id))}
                  >
                    <Badge><RemoveOutlined fontSize='large' /></Badge>
                  </button>
                  
                  {item.amount}

                  <button
                    onClick={() => dispatch(increaseAmount(item.id))}
                  >
                    <Badge><AddCircleOutlineOutlined fontSize='large' /></Badge>
                  </button>
                </td>
                <td className='cart__table__data'>{(item.price * item.amount).toFixed(2)}</td>
              </tr>
            ))}

            <tr className='cart__table__row'>
              <th colSpan={2} className='cart__table__data--left'>Subtotal</th>
              <td className='cart__table__data'>{totalAmount}</td>
              <td className='cart__table__data'>{totalPrice.toFixed(2)}</td>
            </tr>

            <tr className='cart__table__row'>
              <th colSpan={2} className='cart__table__data--left'>Tax</th>
              <td className='cart__table__data'>24%</td>
              <td className='cart__table__data'>{(totalPrice * 0.24).toFixed(2)}</td>
            </tr>

            <tr className='cart__table__row'>
              <th colSpan={2} className='cart__table__data--left'>Shipping fee</th>
              <td className='cart__table__data'>4.99</td>
              <td className='cart__table__data'>4.99</td>
            </tr>

            <tr className='cart__table__row'>
              <th colSpan={3} className='cart__table__data--left'>Total</th>
              <td className='cart__table__data'>{(totalPrice * 0.24 + 4.99).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <p className='cart__empty'>
          Empty Cart
          <button onClick={handleEmptyCart}>
            <Badge>
              <DeleteForeverOutlined fontSize='large' />
            </Badge>
          </button>
        </p>

        <div className='cart__actions'>
          <button
            onClick={handleCheckout}
          >
            Check out
          </button>
        </div>

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