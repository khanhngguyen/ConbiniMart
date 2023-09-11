import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Product } from '../types/Product'
import axios, { AxiosError } from 'axios';

const ProductDetails = () => {
  const product = useLoaderData() as Product;

  return (
    <div>
      <h2>Product details:</h2>
      <p>{product.title}</p>
      <p>{product.price}</p>
      <p>{product.description}</p>
    </div>
  )
}

export default ProductDetails;

export const productDetailsLoader = async ({ params } : any) => {
  const { id } = params;
  try {
    const response = await axios.get<Product>(`https://kim-fs15-ecommerce-backend.azurewebsites.net/api/v1/products/${id}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return error.message;
  }
}