import React, { useEffect, useState } from "react";
import getSecureAxios from "../../Shared/secureAxios";

export default function ApprovedContactRequest() {
  const axiosSecure = getSecureAxios();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosSecure.get("/parcels").then((res) => {
      setData(res.data);
    });
  }, []);

  const handleApproved= async (id)=>{
    console.log(id)
  await axiosSecure.put(`/updateParcel/${id}`)
   .then(res=>{
    console.log(res)
   })
  }

  console.log(data);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100"><td className="border p-2"> Name</td>
          <td className="border p-2">Email</td>
          <td className="border p-2">Biodata Id</td>
          <td className="border p-2"> Approved contact request</td></tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d?.parcelId}>
              <td className="border p-2">fdgf</td>
              <td className="border p-2">{d?.email}</td>
              <td className="border p-2">{d?.parcelId}</td>
              <td className="p-3 border">
                <button onClick={()=>handleApproved(d?.parcelId)} className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                  Approved
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
