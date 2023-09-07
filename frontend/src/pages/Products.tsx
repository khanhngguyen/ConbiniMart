import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector'

const Products = () => {
    const { products } = useAppSelector(state => state.productsReducer);
  return (
    <div>
        <h1>All Products:</h1>
        <ul>
            {products.map((p) => (
                <li key={p.id.toString()}>
                    <p>{p.title}</p>
                    <p>{p.price}</p>
                    <p>{p.category.name}</p>
                    <p>{p.description}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Products