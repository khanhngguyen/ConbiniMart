import React from 'react'
import { StarOutlineRounded } from '@mui/icons-material'

import { Product } from '../../types/Product'
import product1 from "../../styles/assets/product-1.png"

interface ProductCardProps {
    product: Product
}

const ProductCard = (props: ProductCardProps) => {
  return (
    <div className='product__card'>
        <figure>
            <img src={product1} width='189' height='189' loading='lazy' alt='product' />
        </figure>

        <div className='product__card__rating__wrapper'>
            <StarOutlineRounded fontSize='large'/>
            <StarOutlineRounded fontSize='large'/>
            <StarOutlineRounded fontSize='large'/>
            <StarOutlineRounded fontSize='large'/>
            <StarOutlineRounded fontSize='large'/>
        </div>

        <h3 className='product__card__title'>
            {props.product.title}
        </h3>

        <p className='product__card__price'>
            {props.product.price}
        </p>

        <div className='product__card__buttons'>
            <button>Add to Cart</button>
            <button>Add to Favorites</button>
        </div>

        {/* <p>{props.product.title}</p>
        <p>{props.product.description}</p>
        <p>{props.product.price}</p> */}
    </div>
  )
}

export default ProductCard