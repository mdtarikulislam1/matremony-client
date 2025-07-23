import React, { use } from 'react'
import useRole from '../Hooks/useRole';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
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
    // যখন রোল লোড হচ্ছে তখন লোডিং দেখাও
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
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
console.log(role)

  return (
    <div className='flex flex-col gap-4 md:flex-row justify-center max-w-11/12 mx-auto min-h-screen mt-7'>
    <div className='md:flex-1 bg-gray-100 my-3 p-5 rounded-lg max-h-64'>
     {
      role === 'admin'? 
      <div>
    
       <NavLink to='adminDashBoard'   className={({ isActive }) =>
    `flex items-center gap-2 mb-3 text-nowrap inline-block${
      isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
    }`}>Admin Dashboard <MdManageAccounts size={30}/></NavLink>

       <NavLink to='manageUsers'  className={({ isActive }) =>
    `flex items-center gap-2 mb-3 text-nowrap inline-block${
      isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
    }`}>Manage Users  <BiSolidDashboard size={30}/></NavLink>

       <NavLink to='approvedPremium'  className={({ isActive }) =>
    `flex items-center gap-2 mb-3 text-nowrap inline-block${
      isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
    }`}>Approved Premium <TbPremiumRights size={30}/></NavLink>

       <NavLink to='approvedContactRequest'  className={({ isActive }) =>
    `flex items-center gap-2 mb-3 text-nowrap inline-block${
      isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
    }`}>Approved Contact<GrContact size={30}/></NavLink>
    
      </div> 
      : 
      <div>
  <NavLink to='favorites'   className={({ isActive }) =>
    `flex items-center gap-2 mb-3 text-nowrap inline-block${
      isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
    }`}>Favorites <div className='text-red-600'><MdFavorite size={22}/></div></NavLink>

  <NavLink to='editBiodata'   className={({ isActive }) =>
    `flex items-center gap-2 mb-3 text-nowrap inline-block${
      isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
    }`}>Edit Biodata <CiEdit size={22}/></NavLink>

       <NavLink to='contactRequest'  className={({ isActive }) =>
    `flex items-center gap-2 mb-3 text-nowrap inline-block${
      isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
    }`}>Contact Request <GrContact size={22}/></NavLink>

       <NavLink to='viewBioData'  className={({ isActive }) =>
    `flex items-center gap-2 mb-3 whitespace-nowrap${
      isActive ? "text-xl font-bold text-blue-600" : "text-lg font-medium text-gray-600"
    }`}>View BioData<FaUsersViewfinder size={22}/></NavLink>
      </div>

     }
     <motion.button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 mt-5 md:mb-48"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaSignOutAlt size={20} />
        Logout
      </motion.button>
    </div>
    <div className='md:flex-3 lg:flex-4'>
      <Outlet></Outlet>
    </div>
    </div>
  )
}
