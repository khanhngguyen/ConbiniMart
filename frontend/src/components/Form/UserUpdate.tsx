import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Guid } from 'guid-typescript'

import userUpdateSchema, { userUpdateData } from '../../validations/userUpdateSchema'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { updateUser } from '../../redux/reducers/usersReducer'
import { useAppSelector } from '../../hooks/useAppSelector'

const UserUpdate = () => {
    const { error, currentUser } = useAppSelector(state => state.usersReducer);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<userUpdateData>({
        resolver: yupResolver(userUpdateSchema)
    });
    const onSubmitHandler = (data: userUpdateData) => {
        console.log(data);
        dispatch(updateUser({
            id: currentUser?.id as Guid,
            update: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            }
        }));
        reset();
    }

  return (
    <div>
        <h3>Update your profile</h3>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <input
                aria-label='first name'
                type='text'
                placeholder='First name'
                {...register("firstName")}
            />
            {errors.firstName?.message}

            <input
                aria-label='last name'
                type='text'
                placeholder='Last name'
                {...register("lastName")}
            />
            {errors.lastName?.message}

            <input 
                aria-label='email'
                type='text'
                placeholder='Email'
                {...register("email")}
            />
            {errors.email?.message}
            {error && <p>{error}</p>}

            <button
                aria-label='update'
                type='submit'
            >Update</button>
        </form>
    </div>
  )
}

export default UserUpdate