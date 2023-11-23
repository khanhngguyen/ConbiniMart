import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StarRounded, StarBorderRounded, AutoFixHighRounded, FavoriteBorderOutlined, Favorite } from '@mui/icons-material'
import { Badge, Dialog } from '@mui/material';

import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchOneProductById } from '../redux/reducers/productsReducer';
import Loading from '../components/Shared/Loading';
import Error from '../components/Shared/Error';
import product1 from "../styles/assets/product-1.png"
import UpdateProduct from '../components/Form/UpdateProduct';
import { Role } from '../types/User';
import { addToFavorites, removeFromFavorites } from '../redux/reducers/favoritesReducer';

const ProductDetails = () => {
  // const product = useLoaderData() as Product;
  const { loading, error, product } = useAppSelector(state => state.productsReducer);
  const { currentUser } = useAppSelector(state => state.usersReducer);
  const { favProducts } = useAppSelector(state => state.favoritesReducer);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [openUpdate, setOpenUpdate] = useState(false);

  let isAdmin = currentUser?.role;
  if (!currentUser) isAdmin = Role.User;

  let isFavorite = favProducts.find(p => p.id === product?.id);

  let productCategory;
  let categoryEnum = product?.category;
  switch (categoryEnum) {
    case 0:
      productCategory = "Vegetables";
      break;
    case 1:
      productCategory = "Meat";
      break;
    case 2:
      productCategory = "Dairy";
      break;
    case 3:
      productCategory = "Others";
      break;
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const handleToggleAddToFavorites = () => {
    if (isFavorite) {
        dispatch(removeFromFavorites(product!));
    } else {
        dispatch(addToFavorites(product!));
    }
    // dispatch(addToFavorites(product!));
  }

  useEffect(() => {
    dispatch(fetchOneProductById(id ?? ""));
  }, [dispatch, id, currentUser])

  if (loading) {
    return (<><Loading /></>)
  } else if (error) {
    return (<><Error error={error} /></>)
  }

  return (
    <section className='product-details'>
      <div className='container'>
        <p className='product-details__title'> -- Product Details --</p>
        <div className='product-details__wrapper'>

          <div className='product-details__wrapper__images'>
            <figure className='product-details__wrapper__images__main'>
              <img 
                src='https://www.bhg.com/thmb/Mwd_YEkDbVg_fPsUDcWr3eZk9W0=/5645x0/filters:no_upscale():strip_icc()/difference-between-fruits-vegetables-01-5f92e7ec706b463287bcfb46985698f9.jpg' 
                // src={product1} 
                // src={product?.image.link}
                alt='product main thumbnail'
                loading='lazy'
              />
            </figure>

            <ul className='product-details__wrapper__images__extra'>
              <li>
                <img 
                  src={product1} 
                  alt='product extra images' 
                  loading='lazy'
                />
              </li>
              <li>
                <img 
                  src='https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&resize=556,505'
                  alt='product extra images' 
                  loading='lazy'
                  width='700'
                  height='700'
                />
              </li>
              <li>
                <img 
                  src='https://www.bhg.com/thmb/Mwd_YEkDbVg_fPsUDcWr3eZk9W0=/5645x0/filters:no_upscale():strip_icc()/difference-between-fruits-vegetables-01-5f92e7ec706b463287bcfb46985698f9.jpg' 
                  alt='product extra images' 
                  loading='lazy'
                  width='700'
                  height='700'
                />
              </li>
              <li>
                <img 
                  src={product1} 
                  alt='product extra images' 
                  loading='lazy'
                  width='700'
                  height='700'
                />
              </li>
              <li>
                <img 
                  src='https://www.bhg.com/thmb/Mwd_YEkDbVg_fPsUDcWr3eZk9W0=/5645x0/filters:no_upscale():strip_icc()/difference-between-fruits-vegetables-01-5f92e7ec706b463287bcfb46985698f9.jpg' 
                  // src={product1} 
                  alt='product extra images' 
                  loading='lazy'
                  width='700'
                  height='700'
                />
              </li>
              <li>
                <img 
                  src={product1} 
                  alt='product extra images' 
                  loading='lazy'
                  width='700'
                  height='700'
                />
              </li>
            </ul>

          </div>

          <div className='product-details__wrapper__content'>
            <h3>{product?.title}</h3>
            <h5>{productCategory}</h5>
            <h5>{ isAdmin ? "" : "Id: " + product?.id.toString() }</h5>
            <h5>{ isAdmin ? "" : "Inventory: " + product?.inventory }</h5>
            <h4>{product?.price} €</h4>

            { (!isAdmin) && 
              <div className='product-details__wrapper__content__update'>
                <button
                  onClick={handleOpenUpdate}
                >
                  <Badge>
                    <AutoFixHighRounded fontSize='large'/>
                  </Badge>
                  <div className='update__tooltip'>Edit Product</div>
                </button>
                <Dialog
                  open={openUpdate}
                  onClose={handleCloseUpdate}
                >
                  <UpdateProduct handleClose={handleCloseUpdate} currentCategory={categoryEnum!} />
                </Dialog>
              </div>
            }

            <div className='product-details__wrapper__content__rating'>
              <StarRounded fontSize='large'/>
              <StarRounded fontSize='large'/>
              <StarRounded fontSize='large'/>
              <StarRounded fontSize='large'/>
              <StarBorderRounded fontSize='large'/>
            </div>

            <p className='product-details__wrapper__content__description'>
              {product?.description}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, labore necessitatibus consequuntur deleniti quasi id enim dolorum cumque inventore est, eius nam. Accusamus cupiditate, vel, quibusdam optio quaerat sunt culpa, consectetur natus repellat id quisquam! Ea temporibus laudantium, voluptatum ut, soluta fuga magni assumenda ex, voluptate itaque ipsam nisi quisquam.
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat officiis ullam ea ducimus odio consequatur ex adipisci impedit quidem ipsum.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam quidem placeat assumenda voluptate, nihil sapiente officia accusamus officiis, debitis porro maiores rerum. Molestias, illum voluptas. Laudantium porro nostrum praesentium quaerat.
            </p>

            <div className='product-details__wrapper__content__quantity'>
              <input
                type='number'
                name='quantity'
                // value='1'
                min='1'
                max='20'
              />
              <button>Add to Cart</button>
              <button 
                onClick={handleToggleAddToFavorites}
                className='add-to-favorites'>
                <Badge>
                  { isFavorite ? <Favorite fontSize='large' /> : <FavoriteBorderOutlined fontSize='large' />} 
                  {/* <FavoriteBorderOutlined fontSize='large' /> */}
                </Badge>
              </button>
            </div>

          </div>

        </div>

        <h4 className='product-details__info'>Additional information:</h4>

        <table className='product-details__table'>
          <tbody>
            <tr className='product-details__table__row'>
              <th className='product-details__table__row__heading' scope='row'>Ratings</th>
              <td className='product-details__table__row__data'>
                <div className='product-details__table__row__data__rating'>
                  <StarRounded fontSize='large'/>
                  <StarRounded fontSize='large'/>
                  <StarRounded fontSize='large'/>
                  <StarRounded fontSize='large'/>
                  <StarBorderRounded fontSize='large'/>
                </div>
              </td>
            </tr>

            <tr className='product-details__table__row'>
              <th className='product-details__table__row__heading' scope='row'>Categories</th>
              <td className='product-details__table__row__data'>
                {productCategory}
              </td>
            </tr>

            <tr className='product-details__table__row'>
              <th className='product-details__table__row__heading' scope='row'>Origins</th>
              <td className='product-details__table__row__data'>
                Lorem ipsum dolor sit amet.
              </td>
            </tr>

            <tr className='product-details__table__row'>
              <th className='product-details__table__row__heading' scope='row'>Instructions</th>
              <td className='product-details__table__row__data'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita debitis veniam maxime praesentium ipsam saepe sequi, provident animi incidunt libero.
              </td>
            </tr>

          </tbody>

        </table>

      </div>
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