import React, { useEffect } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch'
import loginSchema, { LogInFormData } from '../../validations/loginSchema';
import { login } from '../../redux/reducers/usersReducer';
import { useAppSelector } from '../../hooks/useAppSelector';

interface LogInFormProps {
  toggleClass: () => void;
}

const LogInForm = (props: LogInFormProps) => {
  const { error, currentUser } = useAppSelector(state => state.usersReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset
  } = useForm<LogInFormData>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmitHandler = (data: LogInFormData) => {
    console.log(data);
    dispatch(login({
      email: data.email,
      password: data.password
    }));
    // reset();
  }
  
  useEffect(() => {
    if (currentUser) navigate("profile");
  }, [navigate, currentUser])

  return (
    <div className='form-container'>
        <h2>Log In:</h2>
        <form 
          onSubmit={handleSubmit(onSubmitHandler)}
          className='form-container__form'
        >
          <label htmlFor='emalinput'>Email</label>
          <input
            aria-label='email'
            type='email'
            id='emailinput'
            required
            {...register("email")}
          />
          <p>{errors.email?.message}</p>

          <label htmlFor='passwordinput'>Password</label>
          <input
            aria-label='password'
            type='password'
            id='passwordinput'
            required
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
          {error && <p className='error'>{error}</p>}

          <button
            aria-label='log in'
            type='submit'
          >Log In</button>

          <p 
          onClick={props.toggleClass}
          className='toggle-class'
          >
            Don't have an account? Register here
          </p>
        </form>
    </div>
  )
}

export default LogInForm