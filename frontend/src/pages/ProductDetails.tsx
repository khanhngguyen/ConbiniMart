import React, { useEffect } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import axios, { AxiosError } from 'axios';
import { StarRounded, StarBorderRounded } from '@mui/icons-material'

import { Product } from '../types/Product'
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
    <section className='product-details'>
      <div className='container'>
        <div className='wrapper'>

          <div className='product-details__images'>
            <figure className='product-details__images__main'>
              {/* <img /> */}
            </figure>

            <ul className='product-details__images__extra'>
              <li>
                {/* <img /> */}
              </li>
              <li>
                {/* <img /> */}
              </li>
              <li>
                {/* <img /> */}
              </li>
              <li>
                {/* <img /> */}
              </li>
            </ul>

          </div>

          <div className='product-details__content'>
            <h3>{product?.title}</h3>
            <h4>{product?.price}</h4>

            <div className='product-details__content__rating'>
              <StarRounded fontSize='large'/>
              <StarRounded fontSize='large'/>
              <StarRounded fontSize='large'/>
              <StarRounded fontSize='large'/>
              <StarBorderRounded fontSize='large'/>
            </div>

            <p className='product-details__content__description'>
              {product?.description}
            </p>

            <div className='product-details__content__quantity'>
              <input
                type='number'
                name='quantity'
                value='1'
                min='1'
                max='20'
              />
              <button>Add to Cart</button>
            </div>

          </div>

          <h4 className='product-details__info'>Additional information:</h4>

          <table className='product-details__table'>

            <tr className='product-details__table__row'>
              <th className='product-details__table__row__heading'>Ratings</th>
              <td className='product-details__table__row__data'>
                <div className='product-details__content__rating'>
                  <StarRounded fontSize='large'/>
                  <StarRounded fontSize='large'/>
                  <StarRounded fontSize='large'/>
                  <StarRounded fontSize='large'/>
                  <StarBorderRounded fontSize='large'/>
                </div>
              </td>
            </tr>

            <tr className='product-details__table__row'>
              <th className='product-details__table__row__heading'>Categories</th>
              <td className='product-details__table__row__data'>
                {product?.category.name}
              </td>
            </tr>

            <tr className='product-details__table__row'>
              <th className='product-details__table__row__heading'>Origins</th>
              <td className='product-details__table__row__data'>
                Lorem ipsum dolor sit amet.
              </td>
            </tr>

            <tr className='product-details__table__row'>
              <th className='product-details__table__row__heading'>Instructions</th>
              <td className='product-details__table__row__data'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita debitis veniam maxime praesentium ipsam saepe sequi, provident animi incidunt libero.
              </td>
            </tr>

          </table>

        </div>
      </div>
      
      {/* <h2>Product details:</h2>
      <p>{product?.title}</p>
      <p>{product?.price}</p>
      <p>{product?.description}</p> */}
    </section>
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