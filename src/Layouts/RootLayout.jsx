import React from 'react'
import { Outlet } from 'react-router'
import Navber from '../Pages/Shared/Navber'
import Footer from '../Pages/Shared/Footer'

export default function RootLayout() {
  return (
    <>
    <div className=''>
       <Navber></Navber>
    </div>
     <Outlet></Outlet>
    <Footer></Footer>
    
    </>
  )
}
