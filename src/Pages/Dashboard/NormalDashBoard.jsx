import React, { use, useEffect } from "react";
import { FaUserEdit, FaUser, FaHeart, FaSignOutAlt, FaEnvelopeOpenText } from "react-icons/fa";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const NormalDashBoard = () => {
 const { logOut } = use(AuthContext);
 const navigate = useNavigate();



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


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const routes = [
    {
      name: "Edit Biodata",
      icon: <FaUserEdit size={26} className="text-purple-600" />,
      link: "/biodataform",
    },
    {
      name: "View Biodata",
      icon: <FaUser size={26} className="text-green-600" />,
      link: "/view-biodata",
    },
    {
      name: "My Contact Request",
      icon: <FaEnvelopeOpenText size={26} className="text-yellow-600" />,
      link: "/contact-requests",
    },
    {
      name: "Favourites Biodata",
      icon: <FaHeart size={26} className="text-pink-600" />,
      link: "/favourites-biodata",
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 flex flex-col items-center p-4">
      {/* Title */}
      <motion.h1
        className="text-3xl font-bold mb-8 text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Dashboard
      </motion.h1>

      {/* Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl"
        data-aos="fade-up"
      >
        {routes.map((route, index) => (
          <a
            key={index}
            href={route.link}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 p-5 rounded-xl shadow-lg bg-white hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-gray-100 p-3 rounded-full shadow-inner">
              {route.icon}
            </div>
            <span className="text-lg font-medium text-gray-800 text-center sm:text-left">
              {route.name}
            </span>
          </a>
        ))}
      </div>

      {/* Logout Button (Below Cards) */}
      <motion.button
        onClick={handleLogout}
        className="mt-8 flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaSignOutAlt size={20} />
        Logout
      </motion.button>
    </div>
  );
};

export default NormalDashBoard;
