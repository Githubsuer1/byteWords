import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <>
        <div className='w-full min-h-screen'>
            <Navbar />

            <Outlet />
        </div>
    </>
  )
}

export default Layout