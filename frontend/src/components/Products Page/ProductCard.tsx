import React from 'react'
import { StarRounded, FavoriteBorderRounded, Favorite } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { Badge } from '@mui/material'

import { Product } from '../../types/Product'
import product1 from "../../styles/assets/product-1.png"
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { addToFavorites, removeFromFavorites } from '../../redux/reducers/favoritesReducer'
import { addToCart } from '../../redux/reducers/cartReducer'
import { useAppSelector } from '../../hooks/useAppSelector'

interface ProductCardProps {
    product: Product
}

const ProductCard = (props: ProductCardProps) => {
    const { favProducts } = useAppSelector(state => state.favoritesReducer);
    const dispatch = useAppDispatch();

    let isFavorite = favProducts.find(p => p.id === props.product.id);

    const handleToggleAddToFavorites = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(props.product));
        } else {
            dispatch(addToFavorites(props.product));
        }
    }

    const handleAddToCart = () => {
        dispatch(addToCart(props.product));
    }

  return (
    <div className='product__card'>
        {/* <NavLink to={props.product.id.toString()}> */}
        <figure>
            <NavLink to={props.product.id.toString()}>
                {/* { props.product.image.link 
                ? <img
                    src={props.product.image.link}
                    width='200' height='200' loading='lazy' alt='product'
                    />
                : <img 
                    src={product1} 
                    width='200' height='200' loading='lazy' alt='product'
                    />
                } */}
                {/* <img 
                    src={product1} 
                    width='200' height='200' loading='lazy' alt='product' 
                /> */}
                <img 
                    src={props.product.image.link} 
                    width='200' height='200' loading='lazy' alt='product' 
                />
            </NavLink>
            <div className='favorite'>
                <button type='button' onClick={handleToggleAddToFavorites}>
                    <Badge>
                        { isFavorite ? <Favorite fontSize='large' sx={ { fill: "#05c26a !important" } } /> : <FavoriteBorderRounded fontSize='large' />}
                        {/* <FavoriteBorderRounded fontSize='large'/> */}
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

        <NavLink to={props.product.id.toString()}>
            <div className='product__card__title'>
                <h3>{props.product.title}</h3>
                <p className='title__tooltip'>{props.product.title}</p>
            </div>
        </NavLink>

        <p className='product__card__price'>
            {props.product.price} €
        </p>

        <div className='product__card__buttons'>
            <button
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
        </div>

        {/* </NavLink> */}
    </div>
  )
}

export default ProductCard