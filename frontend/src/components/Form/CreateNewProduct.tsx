import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import createProductSchema, { createProductFormData } from '../../validations/createProductSchema';
import { createNewProduct, fetchAllProducts } from '../../redux/reducers/productsReducer';

interface CreateNewProductProps {
    handleClose: () => void;
}

const CreateNewProduct = (props: CreateNewProductProps) => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<createProductFormData>({
        resolver: yupResolver(createProductSchema)
    });

    const onSubmitHandler = (data : createProductFormData) => {
        console.log(data);
        dispatch(createNewProduct({
            title: data.title,
            description: data.description,
            price: data.price,
            category: data.category,
            inventory: data.inventory,
            image: {
                link: data.image
            }
        }));
        dispatch(fetchAllProducts());
        props.handleClose();
    }

  return (
    <div className='form-container'>
        <h2>Create a new product</h2>
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className='form-container__form'
        >
            <label htmlFor='product-title'>Product title*</label>
            <input
                aria-label='product title'
                type='text'
                id='product-title'
                required
                {...register("title")}
            />
            {errors.title?.message}

            <label htmlFor='product-description'>Description*</label>
            <input
                aria-label='product description'
                type='text'
                id='product-description'
                required
                {...register("description")}
            />
            {errors.description?.message}

            <label htmlFor='product-price'>Price*</label>
            <input
                aria-label='product price'
                type='number'
                id='product-price'
                placeholder='e.g. 20 or 20.99'
                required
                {...register("price")}
            />
            {errors.price?.message}

            <label htmlFor='product-category'>Category*</label>
            <input
                type='number'
                list='categories'
                id='product-category'
                required
                {...register("category")}
            />
            <datalist id='categories'>
                <option value="0">Vegetables</option>
                <option value="1">Meat</option>
                <option value="2">Dairy</option>
                <option value="3">Others</option>
            </datalist>

            <label htmlFor='product-inventory'>Inventory*</label>
            <input
                aria-label='product inventory'
                type='number'
                id='product-inventory'
                placeholder='whole number only, e.g. 100, 250'
                required
                {...register("inventory")}
            />

            <label htmlFor='product-image'>Image link*</label>
            <input
                aria-label='product image'
                type='url'
                id='product-image'
                required
                {...register("image")}
            />

            <div className='create-new-product__buttons'>
                <button
                    onClick={props.handleClose}
                    className='create-new-product__buttons__cancel'
                >Cancel</button>
                <button
                    type='submit'
                    className='create-new-product__buttons__create'
                >Create</button>
            </div>
 
        </form>
    </div>
  )
}

export default CreateNewProduct