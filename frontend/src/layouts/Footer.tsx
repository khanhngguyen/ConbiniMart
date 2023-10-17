import React from 'react'
import { NavLink } from 'react-router-dom'
import { FacebookOutlined, Instagram, YouTube, Twitter, MailOutline } from '@mui/icons-material';


const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__top'>
        <div className='footer__top__container'>

          <div className='footer__top__container__brand'>
            <h1>
              <NavLink to="/">Conbini<span className='span'>Mart</span></NavLink>
            </h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas obcaecati adipisci est architecto. Sed, consectetur fugit nesciunt vel a quibusdam.</p>
            <ul className='footer__top__container__brand__social-list'>
              <li>
                <FacebookOutlined fontSize='large'/>
              </li>
              <li>
                <Instagram fontSize='large' />
              </li>
              <li>
                <YouTube fontSize='large' />
              </li>
              <li>
                <Twitter fontSize='large' />
              </li>
            </ul>
          </div>

          <div className='footer__top__container__list'>
            <p className='footer__top__container__list__title'>Company</p>
            <p className='footer__top__container__list__text'><NavLink to="about">About us</NavLink></p>
            <p className='footer__top__container__list__text'><NavLink to="products">Shop</NavLink></p>
            <p className='footer__top__container__list__text'><NavLink to="">Blog</NavLink></p>
            <p className='footer__top__container__list__text'><NavLink to="">Contact us</NavLink></p>
          </div>
          
          <div className='footer__top__container__list'>
              <p className='footer__top__container__list__title'>Contact</p>
              <p className='footer__top__container__list__text'><address>Helsinki, Helsinki, 00011, Finland</address></p>
              <p className='footer__top__container__list__text'>+001293090234</p>
              <p className='footer__top__container__list__text'>conbinimart@mail.com</p>
          </div>

          <div className='footer__top__container__list'>
            <p className='footer__top__container__list__title'>Newsletter</p>
            <p className='footer__top__container__list__newsletter'>Fill in your email to receive news about new arrivals & discount</p>
            <form>
              <input
                type='email'
                name='email'
                placeholder='Fill in with you Email'
              />
              <button
                type='submit'
                aria-label='submit'
              >
                <MailOutline fontSize='large' />
              </button>
            </form>
          </div>

        </div>
      </div>
      
      <div className='footer__bottom'>
        <div className='footer__bottom__container'>
          <p className='footer__bottom__container__copyright'>&copy; 2023. ConbiniMart.</p>
          <ul className='footer__bottom__container__list'>
            <li>Terms and Services</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer