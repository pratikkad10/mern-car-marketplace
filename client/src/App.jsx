import './index.css'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import Signup from './pages/auth/signup'
import Signin from './pages/auth/signin'
import Home from './pages/Home'
import Layout from './layout/Layout'
import Errorpage from './pages/Errorpage'
import Sellform from './components/Sellform'
import AboutUs from './pages/About'
import ContactUs from './pages/Contactus'
import BuyCar from './components/BuyCar'
import Profile from './pages/Profile'
import UserDashboard from './components/UserDashboard'
import ProtectedRoute from './components/ProtectedRoute'  
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <Layout>
      <ToastContainer />
      <div className="container ">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/signup' element={<Signup />} />
          <Route path='/user/login' element={<Signin />} />
          <Route path="/cars" element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/car/sell" element={<Sellform />} />
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/user/dashboard' element={<UserDashboard />} />
            <Route path='/cars/buy' element={<BuyCar />} />
          </Route>

          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />
          

          <Route path="*" element={<Errorpage />} />
        </Routes>
      </div>
    </Layout>
  )
}

export default App
