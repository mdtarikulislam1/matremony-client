import React, { use } from 'react'
import useRole from '../Hooks/useRole';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { MdManageAccounts } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { TbPremiumRights } from "react-icons/tb";
import { GrContact } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';
import { motion } from "framer-motion";
import { FaSignOutAlt } from 'react-icons/fa'
import { FaUsersViewfinder } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

export default function DashBoardLayouts() {
  const [role, loading] = useRole(); 
  const { logOut } = use(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return null; 
  }

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out successfully!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        navigate("/signin");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Logout failed!",
          text: error.message,
        });
      });
  };

  return (
    <div className='flex flex-col gap-4 md:flex-row justify-center max-w-11/12 mx-auto min-h-screen my-8'>
      
      {/* --- Sidebar sticky --- */}
      <div className='md:flex-1 sticky top-18 left-14 z-10 h-screen p-4 hidden lg:flex flex-col max-w-60'>
        {
          role === 'admin' ? 
          <div>
            <NavLink to={`/dashboard/${role}/adminDashBoard`} className={({ isActive }) =>
              `flex items-center gap-2 mb-3 text-nowrap ${
                isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
              }`
            }>
            <MdManageAccounts size={25}/>  Admin Dashboard 
            </NavLink>

            <NavLink to={`/dashboard/${role}/manageUsers`} className={({ isActive }) =>
              `flex items-center gap-2 mb-3 text-nowrap ${
                isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
              }`
            }>
             <BiSolidDashboard size={25}/> Manage Users 
            </NavLink>

            <NavLink to={`/dashboard/${role}/approvedPremium`} className={({ isActive }) =>
              `flex items-center gap-2 mb-3 text-nowrap ${
                isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
              }`
            }>
            <TbPremiumRights size={25}/>  Approved Premium 
            </NavLink>

            <NavLink to={`/dashboard/${role}/approvedContactRequest`} className={({ isActive }) =>
              `flex items-center gap-2 mb-3 text-nowrap ${
                isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
              }`
            }>
             <GrContact size={25}/> Approved Contact 
            </NavLink>
          </div> 
          : 
          <div>
            <NavLink to={`/dashboard/${role}/favorites`} className={({ isActive }) =>
              `flex items-center gap-2 mb-3 text-nowrap ${
                isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
              }`
            }>
             <MdFavorite size={22} Favorites  className='text-red-600'/> Favorite
            </NavLink>

            <NavLink to={`/dashboard/${role}/editBioData`} className={({ isActive }) =>
              `flex items-center gap-2 mb-3 text-nowrap ${
                isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
              }`
            }>
             <CiEdit size={22}/> Edit Biodata 
            </NavLink>

            <NavLink to={`/dashboard/${role}/contactRequest`} className={({ isActive }) =>
              `flex items-center gap-2 mb-3 text-nowrap ${
                isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
              }`
            }>
             <GrContact size={22}/> Contact Request 
            </NavLink>

            <NavLink to={`/dashboard/${role}/viewbioData`} className={({ isActive }) =>
              `flex items-center gap-2 mb-3 text-nowrap ${
                isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
              }`
            }>
             <FaUsersViewfinder size={22}/> Your Data
            </NavLink>
          </div>
        }

        <motion.button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 mt-5"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSignOutAlt size={20} />
          Logout
        </motion.button>
      </div>

      {/* --- Main Content --- */}
      <div className='md:flex-3 lg:flex-4 p-4'>
        <Outlet />
      </div>
    </div>
  )
}
