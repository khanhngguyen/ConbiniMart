import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import signupSchema, { SignUpFormData } from '../../validations/signupSchema';
import { createNewUser } from '../../redux/reducers/usersReducer';
import { useAppSelector } from '../../hooks/useAppSelector';

interface SignUpFormProps {
    display: boolean
}

const SignUpForm = (props: SignUpFormProps) => {
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
    <div className={`form-container signup ${props.display ? "display" : ""}`}>
        <h2>Sign Up:</h2>
        <form 
            onSubmit={handleSubmit(onSubmitHandler)}
            className='form-container__form signup__form'
        >
            <label htmlFor='first-name'>First name*</label>
            <input
                aria-label='first-name'
                type='text'
                id='first-name'
                {...register("firstName")}
                required
            />
            {errors.firstName?.message}

            <label htmlFor='last-name'>Last name*</label>
            <input
                aria-label='last-name'
                type='text'
                id='last-name'
                {...register("lastName")}
                required
            />
            {errors.lastName?.message}

            <label htmlFor='email'>Email*</label>
            <input
                aria-label='email'
                type='email'
                id='email'
                {...register("email")}
                required
            />
            {errors.email?.message}

            <label htmlFor='password'>Password*</label>
            <input
                aria-label='password'
                type='password'
                id='password'
                {...register("password")}
                required
            />
            {errors.password?.message}

            <label htmlFor='avatar'>Avatar</label>
            <input
                aria-label='avatar'
                type='text'
                id='avatar'
                placeholder='Avatar link (optional)'
                {...register("avatar")}
            />
            {errors.avatar?.message}
            {error && <p className='error'>{error}</p>}

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