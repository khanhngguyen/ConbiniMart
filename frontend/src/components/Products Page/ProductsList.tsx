import React from 'react'
import { SearchRounded } from '@mui/icons-material'

import { useAppSelector } from '../../hooks/useAppSelector'
import Loading from '../Shared/Loading'
import Error from '../Shared/Error'
import ProductCard from './ProductCard'
import { Badge } from '@mui/material'
import { useAppDispatch } from '../../hooks/useAppDispatch'

const ProductsList = () => {
    const { loading, error, products, categories } = useAppSelector(state => state.productsReducer);
    const dispatch = useAppDispatch();

  return (
    <div>
        <ul className='filter__list'>
            <li>
                <button className='filter__list__categories' autoFocus> 
                    <p>All</p>
                </button>
            </li>
            {categories.map(c => (
                <li key={c.name}>
                    <button 
                        className='filter__list__categories'
                    >
                        <p>{c.name}</p>
                    </button>
                </li>
            ))}
            {/* <li>
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
            </li> */}
        </ul>

        <div className='query'>
            <div className='query__search'>
                <form className='form-container__form query-search' id='query-search'>
                    <div className='query-search__icon' id='query-search__icon'>
                        <Badge><SearchRounded fontSize='large' /></Badge>
                    </div>
                    <input 
                        type='text'
                        placeholder='Search product by name'
                    />
                </form>
            </div>

            <div className='query__others'>
                <div className='query__others__container'>
                    <label htmlFor='query-sort'>Sort by:</label>
                    <select name='query-sort' id='query-sort'>
                        <option value="Newest first">Newest first</option>
                        <option value="Oldest first">Oldest first</option>
                        <option value="Least expensive first">Least expensive first</option>
                        <option value="Most expensive first">Most expensive first first</option>
                    </select>
                </div>

                <div className='query__others__container'>
                    <label htmlFor='query-order'>Order by:</label>
                    <select name='query-order' id='query-order'>
                        <option value="true">Ascending</option>
                        <option value="false">Descending</option>
                    </select>
                </div>

                <div className='query__others__container'>
                    <label htmlFor='query-page'>Page: </label>
                    <select name='query-page' id='query-page'>
                        <option value="0">1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                    </select>
                </div>

                <div className='query__others__container'>
                    <label htmlFor='query-pageLimit'>Per page: </label>
                    <select name='query-pageLimit' id='query-pageLimit'>
                        <option value="30">30</option>
                        <option value="20">20</option>
                        <option value="10">10</option>
                    </select>
                </div>

            </div>
        </div>

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