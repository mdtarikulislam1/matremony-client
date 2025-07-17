import React, { use } from 'react'
// import NormalDashBoard from '../Pages/Dashboard/NormalDashBoard'
import { Outlet, useNavigate } from 'react-router'
import NormalDashBoard from '../Pages/Dashboard/NormalDashBoard'
import useRole from '../Hooks/useRole'
import AdminDashBoard from '../Pages/Dashboard/AdminDashBoard'
import Swal from 'sweetalert2'
import { AuthContext } from '../Context/AuthContext'
import { motion } from "framer-motion";
import { FaSignOutAlt } from 'react-icons/fa'

export default function DashBoardLayouts() {
const [role,loading]=useRole()
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
    <div  className=" bg-gradient-to-b from-slate-100 to-slate-200 flex flex-col items-center p-4">
          {role === "admin" ? <AdminDashBoard /> : <NormalDashBoard />}
          <div>
             <motion.button
        onClick={handleLogout}
        className="mt-8 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaSignOutAlt size={20} />
        Logout
      </motion.button>
          </div>
    </div>
  )
}
