import React from 'react'
import { Link } from 'react-router'

export default function BiodataCard({service}) {
    const {_id,profileImage,name,biodataType,occupation,yourAge,addid}=service
  return (
    <div data-aos="fade-up" className="flex flex-col bg-white shadow-2xl rounded-lg">
  <div className="h-80 overflow-hidden rounded-t-lg">
    <img
      className="w-full h-full object-cover object-top"
      src={profileImage}
      alt=""
    />
  </div>
  <div className="flex justify-between p-4">
   <div>
    <p className="text-xl">BioDataId: {addid}</p>
    <p className="text-xl">Name: {name}</p>
    <p className="text-lg">Gender: {biodataType}</p>
    <p className="text-lg">Hoby: {occupation}</p>
    <p className="text-lg">Age: {yourAge}</p>
   </div>
   
     
      <button className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer h-10">
        <Link to={`/details/${_id}`}>Details</Link> 
      </button>
   
   
  </div>
 </div>

  )
}
