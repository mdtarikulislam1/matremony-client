import React, { useEffect, useState } from "react";
import getSecureAxios from "../../Shared/secureAxios";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const axiosSecure = getSecureAxios();
  const [allUsers, setAllUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    axiosSecure
      .get("/users/allData")
      .then((res) => {
        setAllUsers(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Toggle Admin Role
  const handleToggleAdmin = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    try {
      const res = await axiosSecure.put(`/users/role/${user._id}`, {
        role: newRole,
      });
      if (res.data.success) {
        // Update state locally
        const updatedUsers = allUsers.map((u) =>
          u._id === user._id ? { ...u, role: newRole } : u
        );
        setAllUsers(updatedUsers);

        Swal.fire({
          icon: "success",
          title: `User is now ${newRole}! 🎉`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update role!",
          text: res.data.message,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  // Toggle Premium Status
  const handleTogglePremium = async (user) => {
    const newStatus = user.status === "premium" ? "normal" : "premium";

    try {
      const res = await axiosSecure.put(`/users/premium/${user._id}`, {
        status: newStatus,
      });
      if (res.data.success) {
        // Update state locally
        const updatedUsers = allUsers.map((u) =>
          u._id === user._id ? { ...u, status: newStatus } : u
        );
        setAllUsers(updatedUsers);

        Swal.fire({
          icon: "success",
          title: `User is now ${newStatus}! 🎉`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update premium status!",
          text: res.data.message,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  console.log(allUsers);
  return (
    <div className="overflow-x-auto my-8 text-nowrap">
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
              Make Admin
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
              Make Premium
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr
              className="border-t border-gray-200 hover:bg-gray-50"
              key={user?._id}
            >
              <td className="px-4 py-2 text-sm text-gray-800">{user?.name}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{user?.email}</td>

              {/* Make Admin Button */}
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleToggleAdmin(user)}
                  disabled={user?.email === "torikul@gmail.com"} // 👉 এইখানে চেক
                  className={`px-3 py-1 text-xs rounded text-white ${
                    user?.role === "admin"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } transition ${
                    user?.email === "torikul@gmail.com"
                      ? "opacity-50 cursor-not-allowed" // 👉 disabled হলে স্টাইল চেঞ্জ
                      : ""
                  }`}
                >
                  {user?.role === "admin" ? "Cancel Admin" : "Make Admin"}
                </button>
              </td>

              {/* Make Premium Button */}
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleTogglePremium(user)}
                  className={`px-3 py-1 text-xs rounded text-white ${
                    user?.status === "premium"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  } transition`}
                >
                  {user?.status === "premium"
                    ? "Cancel Premium"
                    : "Make Premium"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
