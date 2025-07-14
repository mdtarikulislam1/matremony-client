import React from 'react'
import { Link } from 'react-router'

export default function BiodataCard({service}) {
  
    const {_id,profileImage,name}=service
  return (
    <div data-aos="fade-up" className="flex flex-col bg-white shadow-2xl rounded-lg mx-3">
  <div className="h-80 overflow-hidden rounded-t-lg">
    <img
      className="w-full h-full object-cover object-top"
      src={profileImage}
      alt=""
    />
  </div>
  <div className="flex items-center justify-between p-4">
    <p className="text-xl">{name}</p>
    <Link to={`/details/${_id}`}>
      <button className="bg-yellow-400 py-2 px-4 rounded-lg font-bold">
        Details
      </button>
    </Link>
  </div>
 </div>

  )
}
