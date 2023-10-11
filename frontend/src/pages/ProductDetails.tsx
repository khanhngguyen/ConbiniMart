import React, { useEffect } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { Product } from '../types/Product'
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchOneProductById } from '../redux/reducers/productsReducer';
import Loading from '../components/Shared/Loading';
import Error from '../components/Shared/Error';

const ProductDetails = () => {
  // const product = useLoaderData() as Product;
  const { loading, error, product } = useAppSelector(state => state.productsReducer);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchOneProductById(id ?? ""));
  }, [dispatch, id])

  if (loading) {
    return (<><Loading /></>)
  } else if (error) {
    return (<><Error error={error} /></>)
  }

  return (
    <div>
      <h2>Product details:</h2>
      <p>{product?.title}</p>
      <p>{product?.price}</p>
      <p>{product?.description}</p>
    </div>
  )
}

export default ProductDetails;

// export const productDetailsLoader = async ({ params } : any) => {
//   const { id } = params;
//   try {
//     const response = await axios.get<Product>(`https://fs15kim-ecommerce-backend.azurewebsites.net/api/v1/products/${id}`);
//     console.log(response.data);
//     return response.data;
//   } catch (e) {
//     const error = e as AxiosError;
//     return error.message;
//   }
// }