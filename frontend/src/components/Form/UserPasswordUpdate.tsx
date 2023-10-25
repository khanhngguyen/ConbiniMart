import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Guid } from 'guid-typescript';

import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch';
import userPasswordUpdateSchema, { userPasswordUpdateData } from '../../validations/userPasswordUpdateSchema';
import { updatePassword } from '../../redux/reducers/usersReducer';

const UserPasswordUpdate = () => {
  const { error, currentUser } = useAppSelector(state => state.usersReducer);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<userPasswordUpdateData>({
    resolver: yupResolver(userPasswordUpdateSchema)
  });
  const onSubmitHandler = (data: userPasswordUpdateData) => {
    console.log(data);
    dispatch(updatePassword({
      id: currentUser?.id as Guid,
      password: data.password
    }));
    reset();
  }

  return (
    <div>
      <h3>Change your password</h3>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          aria-label='password'
          type='password'
          placeholder='Password'
          {...register("password")}
        />
        {errors.password?.message}
        {error && <p>{error}</p>}

        <button
          aria-label='update'
          type='submit'
        >Update</button>
      </form>
    </div>
  )
}

export default UserPasswordUpdate