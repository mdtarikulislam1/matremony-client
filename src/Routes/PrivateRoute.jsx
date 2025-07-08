import React, { use } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate } from 'react-router'

export default function PrivateRoute({children}) {
const {user,loading}=use(AuthContext)

if(loading){
    return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-bars loading-xl"></span></div>
}
if(!user){
    <Navigate to='/signin'></Navigate>
}
  return children
}
