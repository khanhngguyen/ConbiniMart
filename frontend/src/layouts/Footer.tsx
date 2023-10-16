import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__top'>
        <div className='container'>
          <div className='footer__top__brand'>
            <NavLink to="/">ConbiniMart</NavLink>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas obcaecati adipisci est architecto. Sed, consectetur fugit nesciunt vel a quibusdam.</p>
            <ul className='footer_top_brand_social-list'>
              <li>
                <a href='facebook'>facebook</a>
              </li>
              <li>
                <a href='instagram'>instagram</a>
              </li>
              <li>
                <a href='youtube'>youtube</a>
              </li>
            </ul>
          </div>

          <div>
            <ul className='footer__list'>
              <li><p>Company</p></li>
              <li><NavLink to="about">About us</NavLink></li>
              <li><NavLink to="products">Shop</NavLink></li>
              <li><NavLink to="">Blog</NavLink></li>
              <li><NavLink to="">Contact us</NavLink></li>
            </ul>
            <ul className='footer__list'>
              <li><p>Contact</p></li>
              <li><address>Helsinki, Helsinki, 00011, Finland</address></li>
              <li>+001293090234</li>
              <li>conbinimart@mail.com</li>
            </ul>
            <div className='footer__list'>
              <p>Newsletter</p>
              <p>Fill in your email to receive news about new arrivals & discount</p>
              <form>
                <input
                  type='email'
                  name='email'
                  placeholder='email'
                />
                <button
                  type='submit'
                  aria-label='submit'
                ></button>
              </form>
            </div>
          </div>

        </div>
      </div>
      
      <div className='footer__bottom'>
        <div className='container'>
          <p>&copy; 2023. ConbiniMart.</p>
          <ul className='footer__bottom__list'>
            <li>Terms and Services</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer