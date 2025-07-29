import React, { useEffect } from "react";
import getSecureAxios from "../../Shared/secureAxios";

export default function ContactTable({ data }) {
 const axiosSecure=getSecureAxios()   
//   console.log(data);
  const id = data?.parcelId

   useEffect(()=>{
    axiosSecure.get(`/buydata/${id}`)
    .then(res=>{
        console.log(res)
    })
  },[])
  console.log(id)

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">dfd</td>
      <td className="p-3">{data?.parcelId}</td>
      <td className="p-3">{data.stutas? 'pending':'approve'}</td>
      <td className="p-3">{data.stutas? 'pending':'approve'}</td>
      <td className="p-3"></td>
      <td className="p-3">
        <button className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
          Delete
        </button>
      </td>
    </tr>
  );
}
