import React from "react";
import { FaUserPlus, FaIdCard, FaSearch, FaHeart } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      title: "Sign Up",
      description: "Register and start your journey towards finding your partner.",
      icon: <FaUserPlus size={40} className="text-pink-500" />,
    },
    {
      title: "Create Profile",
      description: "Create your biodata and make it stand out.",
      icon: <FaIdCard size={40} className="text-green-500" />,
    },
    {
      title: "Search & Connect",
      description: "Browse biodatas and connect with your preferred profiles.",
      icon: <FaSearch size={40} className="text-blue-500" />,
    },
    {
      title: "Success",
      description: "Start your new life through a successful marriage.",
      icon: <FaHeart size={40} className="text-red-500" />,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fadeIn">
          💖 How It Works
        </h2>
        <p className="text-gray-700 mb-10 animate-fadeIn delay-200">
          Follow these 4 easy steps to find your perfect match.
        </p>

        <div
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
