import React from 'react'

const SignUpForm = () => {
  return (
    <div>
        <h2>Sign Up:</h2>
        <input
            aria-label='first-name'
            type='text'
            placeholder='First Name'
        />
        <input
            aria-label='last-name'
            type='text'
            placeholder='Last Name'
        />
        <input
            aria-label='email'
            type='email'
            placeholder='Email'
        />
        <input
            aria-label='password'
            type='password'
            placeholder='Password'
        />
        <input
            aria-label='submit'
            type='submit'
            placeholder='Log In'
        />
    </div>
  )
}

export default SignUpForm