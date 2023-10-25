import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch'
import loginSchema, { LogInFormData } from '../../validations/loginSchema';
import { login } from '../../redux/reducers/usersReducer';
import { useAppSelector } from '../../hooks/useAppSelector';

const LogInForm = () => {
  const { error, currentUser } = useAppSelector(state => state.usersReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LogInFormData>({
    resolver: yupResolver(loginSchema)
  });
  const onSubmitHandler = (data: LogInFormData) => {
    console.log(data);
    dispatch(login({
      email: data.email,
      password: data.password
    }));
    reset();
  }
  
  if (currentUser) navigate("profile");

  return (
    <div>
        <h2>Log In:</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <input
            aria-label='email'
            type='email'
            placeholder='Email'
            {...register("email")}
            required
          />
          {errors.email?.message}

          <input
            aria-label='password'
            type='password'
            placeholder='Password'
            {...register("password")}
            required
          />
          {errors.password?.message}
          {error && <p>{error}</p>}

          <button
            aria-label='log in'
            type='submit'
            placeholder='Log In'
          >Log In</button>
        </form>
    </div>
  )
}

export default LogInForm