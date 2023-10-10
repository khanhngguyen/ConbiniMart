import React from 'react'

const Error = ({ error } : { error : string}) => {
  return (
    <div>{error}</div>
  )
}

export default Error