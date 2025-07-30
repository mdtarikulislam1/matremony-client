import React, { useEffect, useState } from "react";
import getSecureAxios from "../../Shared/secureAxios";
import useRole from "../../../Hooks/useRole";

export default function ApprovedPremium() {
  const [requests, setRequests] = useState([]);
  const { role } = useRole;
  const axiosSecure = getSecureAxios();

  const handlegetPremeumRequest = () => {
    axiosSecure
      .get("/request-premium")
      .then((res) => {
        setRequests(res.data);
      })
     
  };
  useEffect(() => {
    handlegetPremeumRequest()
  }, []);

  // useEffect(()=>{
  //   axiosSecure.get()
  // },[])

  const handlePremeum = (email) => {
    axiosSecure.put(`/makePremeum/update/${email}`).then((res) => {
      handlegetPremeumRequest()
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Premium Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Biodata ID</th>
              <th className="border p-2">Person</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td className="border p-2">{req.name || "N/A"}</td>
                <td className="border p-2">{req.id || "N/A"}</td>
                <td className="border p-2">
                  {req.pending ? "Pending..." : "Approved"}
                </td>
                <td className="border p-2">{req?.email}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handlePremeum(req?.email)}
                  >
                    {req.pending ? "Make Premeum" : "AlReady Premeum"}
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No request found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Dummy delete handler
