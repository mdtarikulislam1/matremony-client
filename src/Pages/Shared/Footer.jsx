import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 text-gray-200">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 animate-fadeIn">
        {/* Logo & About */}
        <div className="transition-transform hover:-translate-y-1">
          <h1 className="text-3xl font-bold text-white mb-4">💞 Matrimony</h1>
          <p className="text-gray-300">
            Find your perfect life partner with our trusted matrimonial platform.
          </p>
        </div>

        {/* Quick Links */}
        <div className="transition-transform hover:-translate-y-1">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Premium Plans</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Policies */}
        <div className="transition-transform hover:-translate-y-1">
          <h2 className="text-xl font-semibold text-white mb-4">Policies</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="transition-transform hover:-translate-y-1">
          <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-white text-pink-600 hover:bg-pink-500 hover:text-white p-3 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-white text-pink-600 hover:bg-pink-500 hover:text-white p-3 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-white text-pink-600 hover:bg-pink-500 hover:text-white p-3 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-white text-pink-600 hover:bg-pink-500 hover:text-white p-3 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-purple-400 mt-8 text-center py-4 text-sm text-gray-300 animate-fadeIn">
        &copy; {new Date().getFullYear()} Matrimony. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
