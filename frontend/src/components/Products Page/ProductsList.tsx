import React from 'react'

import { useAppSelector } from '../../hooks/useAppSelector'
import Loading from '../Shared/Loading'
import Error from '../Shared/Error'
import ProductCard from './ProductCard'

const ProductsList = () => {
    const { loading, error, products } = useAppSelector(state => state.productsReducer);

  return (
    <div>
        <ul className='filter__list'>
            <li>
                <button className='filter__list__categories active'>
                    <p>All</p>
                </button>
            </li>
            <li>
                <button className='filter__list__categories'>
                    <p>Vegetables</p>
                </button>
            </li>
            <li>
                <button className='filter__list__categories'>
                    <p>Meat</p>
                </button>
            </li>
            <li>
                <button className='filter__list__categories'>
                    <p>Dairy</p>
                </button>
            </li>
            <li>
                <button className='filter__list__categories'>
                    <p>Others</p>
                </button>
            </li>
        </ul>

        <ul className='filter__list'>
            <li>sort by price</li>
            <li>products per page</li>
        </ul>

        {loading && <Loading />}
        {error && <Error error={error} />}

        <ul className='products__list'>
            {(!loading) && products.map(product => (
                <ProductCard key={product.id.toString()} product={product} />
            ))}
        </ul>
    </div>
  )
}

export default ProductsList