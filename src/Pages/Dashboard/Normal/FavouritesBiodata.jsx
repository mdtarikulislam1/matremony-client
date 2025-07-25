import React, { useContext, useEffect, useState } from "react";
import getSecureAxios from "../../Shared/secureAxios";
import { AuthContext } from "../../../Context/AuthContext";

export default function FavouritesBiodata() {
  const axiosSecure = getSecureAxios();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/favourites/${user.email}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log("ফেভারিট লোডে সমস্যা:", err);
        });
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        My Favourite Biodatas
      </h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">কোনো ফেভারিট নেই।</p>
      ) : (
        <div className="overflow-x-auto text-nowrap">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Biodata Id</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Division</th>
                <th className="border px-4 py-2 text-left">Occupation</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{item?.addid}</td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.permanentDivision}</td>
                  <td className="border px-4 py-2">{item.Occupation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
