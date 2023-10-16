import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
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
                    <li><NavLink to="about">About</NavLink></li>
                    <li><NavLink to="products">All Products</NavLink></li>
                    <li><NavLink to="login">Log In/Sign Up</NavLink></li>
                </ul>
            </nav>
            <div className='header__navbar-wrapper__actions'>
                <button
                    aria-label='wishlist'
                    className='header__navbar-wrapper__actions__button'
                >
                        {/* <HeartOutline title="wishlist"></HeartOutline> */}
                </button>
                <button
                    aria-label='user-profile'
                    className='header__navbar-wrapper__actions__button'
                ></button>
            </div>
        </div>
    </header>
  )
}

export default Header