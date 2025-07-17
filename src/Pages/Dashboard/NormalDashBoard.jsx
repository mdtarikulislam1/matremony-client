import React, { useEffect } from "react";
import { FaUserEdit, FaUser, FaHeart, FaSignOutAlt, FaEnvelopeOpenText } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
// import { AuthContext } from "../../Context/AuthContext";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router";

const NormalDashBoard = () => {

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
    <div>
    
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl mt-5"
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
     
    </div>
  );
};

export default NormalDashBoard;
