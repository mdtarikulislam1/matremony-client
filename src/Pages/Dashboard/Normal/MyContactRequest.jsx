import React, { useEffect, useState } from "react";
import getSecureAxios from "../../Shared/secureAxios";
import ContactTable from "./ContactTable";

export default function MyContactRequest() {
  const axiosSecure = getSecureAxios();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosSecure.get("/parcels").then((res) => {
      setData(res.data);
    });
  }, []);
 
  console.log(data);
  return (
    <div>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Biodata ID</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Mobile No</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <ContactTable key={d.parcelId} data={d}></ContactTable>
          ))}
        </tbody>
      </table>
    </div>
  );
}
