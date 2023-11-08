import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Guid } from 'guid-typescript';
import { Badge } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import userPasswordUpdateSchema, { userPasswordUpdateData } from '../../validations/userPasswordUpdateSchema';
import { updatePassword } from '../../redux/reducers/usersReducer';

interface UserPasswordUpdateProps {
  display: boolean;
  togglePasswordUpdate: () => void;
}

const UserPasswordUpdate = (props: UserPasswordUpdateProps) => {
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
      password: data.password,
      confirm: data.confirm
    }));
    reset();
  }

  return (
    <div className={`form-container update-password ${props.display ? "display" : ""}`}>
      <h3>Change password</h3>
      <button 
        className='update-password__close'
        onClick={props.togglePasswordUpdate}
      >
            <Badge>
                <CloseRounded fontSize='large'/>
            </Badge>
        </button>

      <form 
        onSubmit={handleSubmit(onSubmitHandler)}
        className='form-container__form update-password__form'
      >
        <input
          aria-label='password'
          type='password'
          placeholder='Enter your new password here'
          required
          {...register("password")}
        />
        {errors.password?.message}
        {error && <p>{error}</p>}

        <input
          aria-label='password confirm'
          type='password'
          placeholder='Re-enter to confirm new password'
          required
          {...register("confirm")}
        />
        {errors.confirm?.message}
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