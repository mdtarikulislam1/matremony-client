import Swal from 'sweetalert2'
import { AuthContext } from '../Context/AuthContext'
import { motion } from "framer-motion";
import { FaSignOutAlt } from 'react-icons/fa'

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



<motion.button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 mt-5 md:mb-48"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaSignOutAlt size={20} />
        Logout
      </motion.button>