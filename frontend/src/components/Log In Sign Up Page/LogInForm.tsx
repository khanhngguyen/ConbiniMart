import React from 'react'

const LogInForm = () => {
  return (
    <div>
        <h2>Log In:</h2>
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

export default LogInForm