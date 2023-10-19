import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { KeyboardArrowRight } from '@mui/icons-material'

import heroBanner from "../../styles/assets/hero-banner.png";
import heroBanner1 from "../../styles/assets/hero-banner-1.png";
import heroBanner2 from "../../styles/assets/hero-banner-2.png";
import heroBanner3 from "../../styles/assets/hero-banner-3.png";

const imagesSlider = [ heroBanner, heroBanner1, heroBanner2, heroBanner3];

const HeroSection = () => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        setTimeout(
            () => setIndex((prevIndex) => 
                prevIndex === imagesSlider.length - 1 ? 0 : prevIndex + 1
            ), 3500
        );
        return;
    }, [index]);

  return (
    <section className='hero'>
        <div className='hero__container'>
            <div className='hero__container__content'>
                <p className='hero__container__content__subtitle'>Current campaign: 25% off selected products</p>
                <h2 className='hero__container__content__title'>
                    Quality <span>organic</span> fruits and <span>vegetables</span>
                </h2>
                <p className='hero__container__content__text'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, molestiae?
                </p>
                <button>
                    <NavLink
                        to="products"
                        className="button"
                    >
                        Shop now
                    </NavLink>
                    <KeyboardArrowRight fontSize='large' />
                </button>
            </div>

            <div className='hero__container__banner'>   
                <div className='hero__container__banner__slideshow'>
                    <div
                        className='hero__container__banner__slideshow__slide'
                        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
                    >
                        {imagesSlider.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                width='400'
                                height='400'
                                loading='lazy'
                                alt='vegetables & gruits images slideshow'
                            />
                        ))}
                    </div>
                </div>
                {/* <img
                    src={heroBanner}
                    width='400'
                    height='400'
                    loading='lazy'
                    alt='vegetables & fruits images slideshow'
                /> */}
            </div>
        </div>
    </section>
  )
}

export default HeroSection