import React, { use, useEffect, useState } from "react";
import getSecureAxios from "../../Shared/secureAxios";
import ContactTable from "./ContactTable";
import { AuthContext } from "../../../Context/AuthContext";

export default function MyContactRequest() {
  const axiosSecure = getSecureAxios();
  const [data, setData] = useState([]);
  const {user}=use(AuthContext)

  useEffect(() => {
    axiosSecure.get("/parcels",{
        params: { email: user.email }
    })
    .then((res) => {
      setData(res.data);
    });
  }, []);
 
  return (
    <div className="overflow-x-auto text-nowrap">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">Biodata ID</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Mobile No</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <ContactTable key={d.parcelId} data={d} setData={setData}></ContactTable>
          ))}
        </tbody>
      </table>
    </div>
  );
}
