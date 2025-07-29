import { use, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { NavLink } from "react-router";
import useRole from "../../Hooks/useRole";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = use(AuthContext);
const [role] = useRole(); 
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
              to="/matremony/allData"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Biodatas
            </NavLink>
           
            {user ? (
              <>
               <div className="flex gap-3 items-center">
                 <NavLink
                  to={role=='customer'?`/dashboard/${role}/viewbioData`:`/dashboard/${role}/adminDashBoard`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </NavLink>
                <div className="flex gap-2 items-center">
                  <p className="font-semibold text-xl">{user?.displayName}</p>
                  <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt={user?.displayName} />
                </div>
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
          {user ? (
               <div className="flex gap-3 items-center">
                <div className="flex gap-2 items-center">
                   <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt={user?.displayName} />
                  <p className="font-semibold text-xl">{user?.displayName}</p>
                </div>
               </div>
            ) : (
              <NavLink
                to="/signin"
                className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Login
              </NavLink>
            )}
          <NavLink
            to="/"
            className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/matremony/allData"
            className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Biodatas
          </NavLink>
          
          {user ? (
            <>
              <NavLink
                to={`dashboard/${role}`}
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </NavLink>
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
