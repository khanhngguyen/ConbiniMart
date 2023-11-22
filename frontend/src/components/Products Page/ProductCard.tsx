import React from 'react'
import { StarRounded, FavoriteBorderRounded } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { Badge } from '@mui/material'

import { Product } from '../../types/Product'
import product1 from "../../styles/assets/product-1.png"
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { addToFavorites } from '../../redux/reducers/favoritesReducer'

interface ProductCardProps {
    product: Product
}

const ProductCard = (props: ProductCardProps) => {
    const dispatch = useAppDispatch();

    const handleAddToFavorites = () => {
        dispatch(addToFavorites(props.product));
    }

  return (
    <div className='product__card'>
        <NavLink to={props.product.id.toString()}>
        <figure>
            <img src={product1} width='189' height='189' loading='lazy' alt='product' />
            <div className='favorite'>
                <button type='button' onClick={handleAddToFavorites}>
                    <Badge>
                        <FavoriteBorderRounded fontSize='large'/>
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

        <div className='product__card__title'>
            <h3>{props.product.title}</h3>
            <p className='title__tooltip'>{props.product.title}</p>
        </div>

        {/* <h3 className='product__card__title'>
            {props.product.title}
        </h3> */}

        <p className='product__card__price'>
            {props.product.price} €
        </p>

        <div className='product__card__buttons'>
            <button>
                Add to Cart
            </button>
        </div>

        </NavLink>
    </div>
  )
}

export default ProductCard