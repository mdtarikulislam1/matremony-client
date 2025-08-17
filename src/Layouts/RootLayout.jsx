import React from 'react'
import { Outlet } from 'react-router'
import Navber from '../Pages/Shared/Navber'
import Footer from '../Pages/Shared/Footer'

export default function RootLayout() {
  return (
    <>
    <div className='sticky top-0 right-0 left-0 z-40'>
       <Navber></Navber>
    </div>
     <Outlet></Outlet>
    <Footer></Footer>
    
    </>
  )
}
