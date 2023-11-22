import { Badge } from '@mui/material'
import { FavoriteBorder, ShoppingCart, AccountCircleOutlined } from '@mui/icons-material';
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector';

const Header = () => {
    const { currentUser } = useAppSelector(state => state.usersReducer);
    const { totalFavorites } = useAppSelector(state => state.favoritesReducer);
    const { totalAmount } = useAppSelector(state => state.cartReducer);

  return (
    <header className='header'>
        <div className='header__top-bar'>
            <div className='container'>
                <p>Free shipping for all orders above 100€</p>
            </div>
        </div>

        <div className='header__navbar-wrapper'>

            <div className='header__navbar-wrapper__logo'>
                <h1>
                    <NavLink to="/">Conbini<span className='span'>Mart</span></NavLink>
                </h1>
            </div>

            <nav className='header__navbar-wrapper__nav'>
                <ul className='header__navbar-wrapper__nav__list'>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="about">About</NavLink></li>
                    <li><NavLink to="products">All Products</NavLink></li>
                    {(!currentUser) && <li><NavLink to="login">Login</NavLink></li>}
                </ul>
            </nav>

            <div className='header__navbar-wrapper__actions'>
                <button
                    aria-label='wishlist'
                    className='header__navbar-wrapper__actions__button'
                >
                    <NavLink to="favorites">
                        <Badge badgeContent={totalFavorites}>
                            <FavoriteBorder fontSize='large'/>
                        </Badge>
                    </NavLink>
                </button>
                <button
                    aria-label='cart'
                    className='header__navbar-wrapper__actions__button'
                >
                    <NavLink to="cart">
                        <Badge badgeContent={totalAmount}>
                            <ShoppingCart fontSize='large'/>
                        </Badge>
                    </NavLink>
                </button>

                {(!currentUser) && <NavLink to="login">
                    <button
                        aria-label='user-profile'
                        className='header__navbar-wrapper__actions__button'
                    >
                        <Badge>
                            <AccountCircleOutlined fontSize='large'/>
                        </Badge>
                    </button>
                </NavLink>}

                {currentUser && <NavLink to="profile">
                    <button
                        aria-label='user-profile'
                        className='header__navbar-wrapper__actions__button'
                    >
                        <Badge>
                            <AccountCircleOutlined fontSize='large'/>
                        </Badge>
                    </button>
                </NavLink>}

                {/* <button
                    aria-label='user-profile'
                    className='header__navbar-wrapper__actions__button'
                >
                    {(!currentUser) && <NavLink to="login"></NavLink>}
                    {currentUser && <NavLink to="profile"></NavLink>}
                    <Badge>
                        <AccountCircleOutlined fontSize='large'/>
                    </Badge>
                </button> */}
            </div>
            
        </div>
    </header>
  )
}

export default Header