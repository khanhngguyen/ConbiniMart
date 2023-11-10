import React, { useState } from 'react'

import LogInForm from '../components/Log In Sign Up Page/LogInForm'
import SignUpForm from '../components/Log In Sign Up Page/SignUpForm'

const LogIn = () => {
  const [display, setDisplay] = useState(false);

  const toggleClass = () => {
    setDisplay(!display);
  };

  return (
    <div className='login-page'>
      <LogInForm toggleClass={toggleClass} />
      <SignUpForm display={display}/>
    </div>
  )
}

export default LogIn