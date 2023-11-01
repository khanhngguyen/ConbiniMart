import React from 'react'

import ProductsList from '../components/Products Page/ProductsList';

const Products = () => {
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