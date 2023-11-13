import React, { useEffect } from 'react'

import ProductsList from '../components/Products Page/ProductsList';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchAllProducts } from '../redux/reducers/productsReducer';

const Products = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch])

  return (
    <section className='products'>
        <div className='products__container'>
            <p className='products__container__title'> -- All Products --</p>
            <ProductsList />
        </div>
    </section>
  )
}

export default Products