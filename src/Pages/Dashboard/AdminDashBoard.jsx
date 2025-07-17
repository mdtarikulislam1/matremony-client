import React, { useEffect } from "react";
import { FaUsersCog, FaCheckCircle, FaEnvelopeOpenText } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminDashBoard = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const adminRoutes = [
    {
      name: "Manage Users",
      icon: <FaUsersCog size={26} className="text-blue-600" />,
      link: "/dashboard/manage-users",
    },
    {
      name: "Approved Premium",
      icon: <FaCheckCircle size={26} className="text-green-600" />,
      link: "/dashboard/approved-premium",
    },
    {
      name: "Approved Contact Request",
      icon: <FaEnvelopeOpenText size={26} className="text-purple-600" />,
      link: "/dashboard/approved-contact",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <div
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-aos="fade-up"
      >
        {adminRoutes.map((route, index) => (
          <a
            key={index}
            href={route.link}
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <div className="bg-gray-100 p-4 rounded-full shadow-inner">
              {route.icon}
            </div>
            <span className="text-lg font-semibold text-gray-800 text-center">
              {route.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AdminDashBoard;
