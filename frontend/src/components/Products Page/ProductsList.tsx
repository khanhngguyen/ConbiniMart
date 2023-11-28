import React, { useEffect } from 'react'
import { Badge } from '@mui/material'
import { SearchRounded } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAppSelector } from '../../hooks/useAppSelector'
import Loading from '../Shared/Loading'
import Error from '../Shared/Error'
import ProductCard from './ProductCard'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import productsQuerySchema, { productsQueryFormData } from '../../validations/productsQuerySchema'
import { fetchAllProducts, fetchProductsByCategory } from '../../redux/reducers/productsReducer'
import { QueryOptions } from '../../types/QueryOptions'

const ProductsList = () => {
    const { loading, error, products, categories } = useAppSelector(state => state.productsReducer);
    const dispatch = useAppDispatch();
    
    const {
        register,
        handleSubmit,
        watch
    } = useForm<productsQueryFormData>({
        resolver: yupResolver(productsQuerySchema)
    });
    const onSubmitHandler = (data: productsQueryFormData) => {
        // console.log(data);
        if (!data.search) {
            const query: QueryOptions = {
                category: "all",
                orderBy: data.sort,
                orderByDescending: data.order,
                pageNumber: data.page,
                pageSize: data.pageLimit
            };
            dispatch(fetchAllProducts(query));
            // dispatch(fetchAllProducts());
        } else {
            const query: QueryOptions = {
                search: data.search,
                category: "all",
                orderBy: data.sort,
                orderByDescending: data.order,
                pageNumber: data.page,
                pageSize: data.pageLimit
            };
            dispatch(fetchAllProducts(query));
        }
    };

    useEffect(() => {
        const subscription = watch(() => handleSubmit(onSubmitHandler)());
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch])

  return (
    <div>
        <ul className='filter__list'>
            <li>
                <button 
                    onClick={() => dispatch(fetchAllProducts())}
                    className='filter__list__categories' autoFocus
                > 
                    <p>All</p>
                </button>
            </li>
    
            {categories.map(c => (
                <li key={c.name}>
                    <button 
                        onClick={() => {
                            const name = c.name;
                            dispatch(fetchProductsByCategory(name));
                        }}
                        className='filter__list__categories'
                    >
                        <p>{c.name}</p>
                    </button>
                </li>
            ))}
        </ul>

        <div className='query'>
            <div className='query__search'>
                <form 
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className='form-container__form query-search' id='query-search'
                >
                    <div className='query-search__icon' id='query-search__icon'>
                        <Badge><SearchRounded fontSize='large' /></Badge>
                    </div>
                    <input 
                        type='text'
                        placeholder='Search product by name'
                        {...register("search")}
                    />
                </form>
            </div>

            <div className='query__others'>
                <div className='query__others__container'>
                    <label htmlFor='query-sort'>Sort by:</label>
                    <select
                        id='query-sort' 
                        {...register("sort")} 
                        // onChange={handleSubmit(onSubmitHandler)}
                    >
                        <option value="Newest first">Newest first</option>
                        <option value="Oldest first">Oldest first</option>
                        <option value="Least expensive first">Least expensive first</option>
                        <option value="Most expensive first">Most expensive first first</option>
                    </select>
                </div>

                <div className='query__others__container'>
                    <label htmlFor='query-order'>Order by:</label>
                    <select 
                        id='query-order' 
                        {...register("order")}
                        // onChange={handleSubmit(onSubmitHandler)}
                    >
                        <option value="true">Ascending</option>
                        <option value="false">Descending</option>
                    </select>
                </div>

                <div className='query__others__container'>
                    <label htmlFor='query-page'>Page: </label>
                    <select 
                        id='query-page' 
                        {...register("page")}
                        // onChange={handleSubmit(onSubmitHandler)}
                    >
                        <option value="0">1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                    </select>
                </div>

                <div className='query__others__container'>
                    <label htmlFor='query-pageLimit'>Per page: </label>
                    <select 
                        id='query-pageLimit' 
                        {...register("pageLimit")}
                        // onChange={handleSubmit(onSubmitHandler)}
                    >
                        <option value="30">30</option>
                        <option value="20">20</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
        </div>

        {loading && <Loading />}
        {error && <Error error={error} />}

        {(!loading) && (products.length === 0) && <p>No products to display</p>}

        <p className='products__total'>Total: {products.length} products</p>

        <ul className='products__list'>
            {(!loading) && products.map(product => (
                <ProductCard key={product.id.toString()} product={product} />
            ))}
        </ul>
    </div>
  )
}

export default ProductsList