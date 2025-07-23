import { useEffect, useState, use } from "react";
import { AuthContext } from "../Context/AuthContext";
import getSecureAxios from "../Pages/Shared/secureAxios";

export default function useRole() {
  const { user } = use(AuthContext);
  const axiosSecure = getSecureAxios();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          const { data } = await axiosSecure.get(
            `${import.meta.env.VITE_api_url}/users/role/${user.email}`
          );
          setRole(data?.role);
        } catch (error) {
          console.error("fhhff", error);
          setRole(null); // fallback
        } finally {
          setLoading(false);
        }
      } else {
        // যদি ইউজারই না থাকে
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user?.email, axiosSecure]);

  return [role, loading,];
}
