import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import signupSchema, { SignUpFormData } from '../../validations/signupSchema';
import { createNewUser } from '../../redux/reducers/usersReducer';
import { useAppSelector } from '../../hooks/useAppSelector';

const SignUpForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpFormData>({
        resolver: yupResolver(signupSchema)
    });
    const onSubmitHandler = (data : SignUpFormData) => {
        dispatch(createNewUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            avatar: {
                link: data.avatar
            },
            password: data.password
        }));
    }
    const { error, currentUser } = useAppSelector(state => state.usersReducer);
    useEffect(() => {
        if (currentUser) navigate("/profile");
    }, [navigate, currentUser])

  return (
    <div>
        <h2>Sign Up:</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <input
                aria-label='first-name'
                type='text'
                placeholder='First Name'
                {...register("firstName")}
                required
            />
            {errors.firstName?.message}

            <input
                aria-label='last-name'
                type='text'
                placeholder='Last Name'
                {...register("lastName")}
                required
            />
            {errors.lastName?.message}

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

            <input
                aria-label='avatar'
                type='text'
                placeholder='Avatar link (optional)'
                {...register("avatar")}
            />
            {errors.avatar?.message}

            <button
                aria-label='sign up'
                type='submit'
                placeholder='Sign up'
            >Sign Up</button>
        </form>
    </div>
  )
}

export default SignUpForm