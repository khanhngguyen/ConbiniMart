import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import Loading from '../components/Shared/Loading';
import Error from '../components/Shared/Error';

const Products = () => {
    const { loading, error, products } = useAppSelector(state => state.productsReducer);
    
    if (loading) {
        return (<><Loading /></>)
    } else if (error) {
        return (<><Error error={error}/></>)
    }
    
  return (
    <div>
        <h1>All Products:</h1>
        <ul>
            {products.map((p) => (
                <li key={p.id.toString()}>
                    <p>{p.title}</p>
                    <p>{p.price.toLocaleString()}</p>
                    <p>{p.description}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Products