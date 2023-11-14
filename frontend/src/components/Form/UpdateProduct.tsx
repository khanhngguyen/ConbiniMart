import React from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useForm } from 'react-hook-form';
import updateProductSchema, { updateProductFormData } from '../../validations/updateProductSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProduct } from '../../redux/reducers/productsReducer';
import { Product } from '../../types/Product';
import { Guid } from 'guid-typescript';

interface UpdateProductProps {
  handleClose: () => void;
  currentCategory: number;
}

const UpdateProduct = (props: UpdateProductProps) => {
  const dispatch = useAppDispatch();
  const productId = localStorage.getItem("productId");
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<updateProductFormData>({
    resolver: yupResolver(updateProductSchema)
  });
  const onSubmitHandler = (data: updateProductFormData) => {
    console.log(productId);
    console.log(data);
    console.log(props.currentCategory);
    dispatch(updateProduct({
      id: Guid.parse(productId!),
      update: {
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category!,
        inventory: data.inventory,
        image: {
          link: data.image
        }
      }
    }))
  }

  return (
    <div className='form-container'>
      <h2>Edit product</h2>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className='form-container__form'
      >
        <label htmlFor='product-title'>Product title</label>
        <input
          aria-label='product title'
          type='text'
          id='product-title'
          placeholder='(optional)'
          {...register("title")}
        />
        <p>{errors.title?.message}</p>

        <label htmlFor='product-description'>Description</label>
        <input
          aria-label='product description'
          type='text'
          id='product-description'
          placeholder='(optional)'
          {...register("description")}
        />
        <p>{errors.description?.message}</p>

        <label htmlFor='product-price'>Price</label>
        <input
          aria-label='product price'
          type='number'
          id='product-price'
          placeholder='(optional)'
          defaultValue={0}
          {...register("price")}
        />
        <p>{errors.price?.message}</p>

        <label htmlFor='product-category'>Category</label>
          <input
              type='number'
              list='categories'
              id='product-category'
              defaultValue={props.currentCategory}
              {...register("category")}
          />
          <datalist id='categories'>
            <option value="0">Vegetables</option>
            <option value="1">Meat</option>
            <option value="2">Dairy</option>
            <option value="3">Others</option>
          </datalist>

        <label htmlFor='product-inventory'>Inventory</label>
        <input
          aria-label='product inventory'
          type='number'
          id='product-inventory'
          placeholder='(optional), whole number only, e.g. 100, 250'
          defaultValue={0}
          {...register("inventory")}
        />
        <p>{errors.inventory?.message}</p>

        <label htmlFor='product-image'>Image link</label>
        <input
          aria-label='product image'
          type='url'
          id='product-image'
          placeholder='(optional)'
          {...register("image")}
        />
        <p>{errors.image?.message}</p>

        <div>
          <button
            onClick={props.handleClose}
          >Cancel</button>
          <button
            type='submit'
          >Update</button>
        </div>

      </form>
    </div>
  )
}

export default UpdateProduct