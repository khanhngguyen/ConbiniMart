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
                    <p>Category 1</p>
                </button>
            </li>
            <li>
                <button className='filter__list__categories'>
                    <p>Category 2</p>
                </button>
            </li>
            <li>
                <button className='filter__list__categories'>
                    <p>Category 3</p>
                </button>
            </li>
            <li>
                <button className='filter__list__categories'>
                    <p>Category 4</p>
                </button>
            </li>
        </ul>

        <ul className='filter__list'>
            <li>sort by price</li>
            <li>products per page</li>
        </ul>

        <ul className='products__list'>
            {loading && <Loading />}
            {(!loading) && products.map(product => (
                <ProductCard key={product.id.toString()} product={product} />
            ))}
            {error && <Error error={error} />}

            {/* {products.map(product => (
                <ProductCard key={product.id.toString()} product={product} />
            ))} */}
        </ul>
    </div>
  )
}

export default ProductsList