import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import Footer from '../components/Footer'

const Layout = ({children}) => {
  return (
    <div>
        <Navbar/>
        <div className='min-h-[calc(100vh-105px)]  mt-[53px]'>
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout