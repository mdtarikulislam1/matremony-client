import React from 'react'
import { Link } from 'react-router'

export default function BiodataCard({service}) {
    const {_id,profileImage,name,biodataType,occupation,yourAge}=service
  return (
    <div data-aos="fade-up" className="flex flex-col bg-white shadow-2xl rounded-lg mx-3">
  <div className="h-80 overflow-hidden rounded-t-lg">
    <img
      className="w-full h-full object-cover object-top"
      src={profileImage}
      alt=""
    />
  </div>
  <div className="flex justify-between p-4">
   <div>
    <p className="text-xl">Name: {name}</p>
    <p className="text-lg">Gender: {biodataType}</p>
    <p className="text-lg">Hoby: {occupation}</p>
    <p className="text-lg">Age: {yourAge}</p>
   </div>
   
     
      <button className="bg-yellow-400 py-2 px-4 rounded-lg font-bold h-10">
        <Link to={`/details/${_id}`}>Details</Link> 
      </button>
   
   
  </div>
 </div>

  )
}
