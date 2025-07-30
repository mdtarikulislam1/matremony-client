import React, { useEffect, useState } from "react";
import getSecureAxios from "../../Shared/secureAxios";
import { FaUsers, FaMale, FaFemale, FaCrown } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AdminDashBoard() {
  const axiosSecure = getSecureAxios();
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    total: 0,
    male: 0,
    female: 0,
    premium: 0,
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    axiosSecure
      .get("/bioDatas/counts")
      .then((response) => {
        setCounts(response?.data);
        setLoading(false);
      })
     
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg text-purple-600"></span>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Biodata",
      count: counts.total,
      icon: <FaUsers size={30} className="text-blue-600" />,
      color: "from-blue-100 to-blue-200",
    },
    {
      title: "Male Biodata",
      count: counts.male,
      icon: <FaMale size={30} className="text-green-600" />,
      color: "from-green-100 to-green-200",
    },
    {
      title: "Female Biodata",
      count: counts.female,
      icon: <FaFemale size={30} className="text-pink-600" />,
      color: "from-pink-100 to-pink-200",
    },
    {
      title: "Premium Biodata",
      count: counts.premium,
      icon: <FaCrown size={30} className="text-yellow-500" />,
      color: "from-yellow-100 to-yellow-200",
    },
  ];

  return (
    <div className="mt-8">
      <h2
        className="text-3xl font-bold text-center text-gray-700 mb-8"
        data-aos="fade-down"
      >
        DashBoard Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl shadow-md bg-gradient-to-br ${card.color} hover:scale-105 transition-transform duration-300`}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="p-4 bg-white rounded-full shadow">
                {card.icon}
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <h3 className="text-xl text-center font-semibold text-gray-800">
                  {card.title}
                </h3>
                <p className="text-3xl text-center font-bold text-gray-900">{card.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
