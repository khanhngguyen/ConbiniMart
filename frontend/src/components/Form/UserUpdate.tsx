import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Guid } from 'guid-typescript';
import { Badge } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

import userUpdateSchema, { userUpdateData } from '../../validations/userUpdateSchema'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { updateUser } from '../../redux/reducers/usersReducer'
import { useAppSelector } from '../../hooks/useAppSelector'

interface UserUpdateProps {
    display: boolean;
    toggleUpdate: () => void;
}

const UserUpdate = (props: UserUpdateProps) => {
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
        // console.log(data);
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
    <div className={`form-container user-update ${props.display ? "display" : ""}`}>
        <h3>Edit information</h3>
        <button
            className='user-update__close'
            onClick={props.toggleUpdate}
        >
            <Badge>
                <CloseRounded fontSize='large'/>
            </Badge>
        </button>

        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className='form-container__form user-update__form'
        >
            <input
                aria-label='first name'
                type='text'
                placeholder='First name (optional)'
                {...register("firstName")}
            />
            <p>{errors.firstName?.message}</p>

            <input
                aria-label='last name'
                type='text'
                placeholder='Last name (optional)'
                {...register("lastName")}
            />
            <p>{errors.lastName?.message}</p>

            <input 
                aria-label='email'
                type='text'
                placeholder='Email (optional)'
                {...register("email")}
            />
            <p>{errors.email?.message}</p>
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