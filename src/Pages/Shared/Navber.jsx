import { use, useState } from "react";
import {  useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = use(AuthContext);
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

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Website Name */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-8 lg:w-16 lg:h-10"
              src="https://i.postimg.cc/wBQrm5by/marriage-icon-simple-element-from-psychology-collection-creative-marriage-icon-for-web-design-templa.jpg"
              alt="Logo"
            />
            <span className="ml-2 text-xl font-bold text-gray-800">Matrimony</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-4">
            <NavLink
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/biodatas"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Biodatas
            </NavLink>
            <NavLink
              to="/about"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact Us
            </NavLink>
            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </NavLink>
               <div onClick={handleLogout} className="hover:bg-gray-200 text-black px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                 <button
                  
                >
                  Logout
                </button>
                <MdLogout />
               </div>
              </>
            ) : (
              <NavLink
                to="/signin"
                className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-800 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 z-50">
          <NavLink
            to="/"
            className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/biodatas"
            className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Biodatas
          </NavLink>
          <NavLink
            to="/about"
            className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Contact Us
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="block w-full bg-red-500 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-600 text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
            className={({ isActive }) =>
             isActive ? "bg-blue-700 block text-center px-3 py-2 text-white" : "block bg-gray-300  px-3 py-2 rounded-md text-base font-medium text-center"
              }
              to="/signin"
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
