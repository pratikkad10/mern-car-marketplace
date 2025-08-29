import { LogOut, User, User2 } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
// import { AppContext } from '../context/AppContext';

function Navbar() {
//   const { logout, isLoggedIn } = useContext(AppContext);
   const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="flex justify-between px-[1rem] py-[12px] bg-[#F9FAFB] fixed top-0 w-full shadow-sm z-10">
      <div>
        <NavLink to="/" className="[font-family:var(--font-logo)] text-blue-400 logo cursor-pointer text-xl ">
          AutoMarket
        </NavLink>
      </div>

      <div className="flex gap-12 font-medium items-center">
        <NavLink to="/" className="cursor-pointer hover:text-blue-500">
          Home
        </NavLink>
        <NavLink to="/cars/buy" className="cursor-pointer hover:text-blue-500">
          Buy Car
        </NavLink>
        <NavLink to="/car/sell" className="cursor-pointer hover:text-blue-500">
          Sell Car
        </NavLink>
        <NavLink to="/about" className="cursor-pointer hover:text-blue-500">
          About
        </NavLink>
        <NavLink to="/contact" className="cursor-pointer hover:text-blue-500">
          Contact
        </NavLink>
      </div>

      <div className="flex gap-2 font-normal items-center justify-center">
        {isLoggedIn ? (
          <>
            <NavLink
              to="/user/profile"
            //   onClick={() => logout()}
              className="hover:text-red-700  transition-all delay-75"
            >
             {/* <span className='flex items-center gap-1'> Logout <LogOut/></span>  */}
             <User2/>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/user/login"
              className="hover:text-blue-600 px-4 py-1 rounded-full font-[16px]  transition-all delay-75"
            >
                <span className='flex items-center gap-1'><User /> Sign In</span>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;