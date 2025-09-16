import React from 'react'
import { Link } from 'react-router-dom'

const Protected = ({isAuth, children}) => {
  if (isAuth){
    return children
  }
  else{
    return <Link to="/login">Login</Link>
  }
}
export default Protected