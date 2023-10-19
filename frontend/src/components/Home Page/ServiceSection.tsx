import React from 'react'

import icon1 from '../../styles/assets/service-icon-1.png';
import icon2 from '../../styles/assets/service-icon-2.png';
import icon3 from '../../styles/assets/service-icon-3.png';


const ServiceSection = () => {
  return (
    <section className='service'>
        <div className='service__container'>
            <ul className='service__container__list'>
                <li className='service__container__list__item'>
                    <div className='service__container__list__item__icon'>
                        <img
                            src={icon1}
                            width='40'
                            height='40'
                            loading='lazy'
                            alt='truck icon'
                        />
                    </div>
                    <h3>Free shipping</h3>
                </li>

                <li className='service__container__list__item'>
                    <div className='service__container__list__item__icon'>
                        <img
                            src={icon2}
                            width='40'
                            height='40'
                            loading='lazy'
                            alt='payment card icon'
                        />
                    </div>
                    <h3>Safe payment</h3>
                </li>

                <li className='service__container__list__item'>
                    <div className='service__container__list__item__icon'>
                        <img
                            src={icon3}
                            width='40'
                            height='40'
                            loading='lazy'
                            alt='helpline icon'
                        />
                    </div>
                    <h3>24/7 Support</h3>
                </li>
            </ul>
        </div>
    </section>
  )
}

export default ServiceSection