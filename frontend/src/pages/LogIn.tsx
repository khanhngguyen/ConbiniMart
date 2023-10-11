import React from 'react'

import LogInForm from '../components/Log In Sign Up Page/LogInForm'
import SignUpForm from '../components/Log In Sign Up Page/SignUpForm'

const LogIn = () => {
  return (
    <div>
      <LogInForm />
      <p>Don't have an account? Sign up to create a new one!</p>
      <SignUpForm />
    </div>
  )
}

export default LogIn