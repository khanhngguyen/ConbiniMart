import React from 'react'
import { StarRounded, FavoriteBorderRounded } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

import { Product } from '../../types/Product'
import product1 from "../../styles/assets/product-1.png"
import { Badge } from '@mui/material'

interface ProductCardProps {
    product: Product
}

const ProductCard = (props: ProductCardProps) => {
  return (
    <div className='product__card'>
        <NavLink to={props.product.id.toString()}>
        <figure>
            <img src={product1} width='189' height='189' loading='lazy' alt='product' />
            <div className='favorite'>
                <button>
                    <Badge>
                        <FavoriteBorderRounded fontSize='large' />
                    </Badge>
                    <div className='favorite__tooltip'>Add to favorites</div>
                </button>
            </div>
        </figure>

        <div className='product__card__rating'>
            <StarRounded fontSize='large'/>
            <StarRounded fontSize='large'/>
            <StarRounded fontSize='large'/>
            <StarRounded fontSize='large'/>
            <StarRounded fontSize='large'/>
        </div>

        <h3 className='product__card__title'>
            {props.product.title}
        </h3>

        <p className='product__card__price'>
            {props.product.price} €
        </p>

        <div className='product__card__buttons'>
            <button>
                Add to Cart
            </button>
        </div>

        </NavLink>

        {/* <p>{props.product.title}</p>
        <p>{props.product.description}</p>
        <p>{props.product.price}</p> */}
    </div>
  )
}

export default ProductCard