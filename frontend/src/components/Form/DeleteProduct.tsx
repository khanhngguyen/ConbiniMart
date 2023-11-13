import React from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useForm } from 'react-hook-form';
import deleteProductSchema, { deleteProductFormData } from '../../validations/deleteProductSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteProduct } from '../../redux/reducers/productsReducer';

interface DeleteProductProps {
    handleClose: () => void;
}

const DeleteProduct = (props: DeleteProductProps) => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<deleteProductFormData>({
        resolver: yupResolver(deleteProductSchema)
    });
    const onSubmitHandler = (data : deleteProductFormData) => {
        console.log(data);
        // dispatch(deleteProduct(data.id));
    }

  return (
    <div className='form-container'>
        <h2>Delete a product by Id</h2>
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className='form-container__form'
        >
            <label htmlFor='product-id'>Product Id</label>
            <input 
                aria-label='product id'
                type='text'
                id='product-id'
                required
                {...register("id")}
            />
            <p>{errors.id?.message}</p>

            <h4>Instruction: If you do not have Product Id, goes to Product's Details Page to look for its Id
                <br />
                <a href='dfsdfs'>Example</a>
            </h4>

            <div className='delete-product__buttons'>
                <button
                    onClick={props.handleClose}
                >
                    Cancel
                </button>
                <button
                >
                    Delete
                </button>
            </div>
        </form>

    </div>
  )
}

export default DeleteProduct