import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import getSecureAxios from '../Shared/secureAxios'


export default function Details() {
 const { id } = useParams();
 const [datas,setDatas]=useState(null)
//  const [semiler,setSemiler]=useState(null)
 const [loading, setLoading] = useState(true);
 const axiosSecure = getSecureAxios()


 useEffect(()=>{
 axiosSecure.get(`/details/${id}`)
  .then(response => {
        setDatas(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
//  axiosSecure.get(`/semiler?gender=${datas?.biodataType}&exclude=${id}&limit=3`)
//   .then(respons => {
//         setSemiler(respons.data);
//          setLoading(false);
//       })
//       .catch(error => {
//         setLoading(false);
//       });
 },[])
// console.log("data",semiler)
  if (loading) {
   return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="loading loading-dots loading-xl"></span>
    </div>
  );
  }

  return (
    <div  className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
  {/* Profile Image */}
  <div className="col-span-1">
    <img data-aos="fade-right"
      className="w-full h-full rounded-xl object-contain shadow-lg"
      src={datas?.profileImage}
      alt={datas?.name}
    />
  </div>

  {/* Biodata Details */}
  <div data-aos="fade-left" className="col-span-2 bg-white rounded-xl shadow-lg border border-yellow-400 p-6 flex flex-col gap-3">
    <h2 className="text-3xl font-bold text-yellow-500 mb-4">{datas?.name}</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left Column */}
      <div className="flex flex-col gap-2">
        <p><span className="font-semibold text-gray-700">Age:</span> {datas?.yourAge} years</p>
        <p><span className="font-semibold text-gray-700">Date of Birth:</span> {datas?.dob}</p>
        <p><span className="font-semibold text-gray-700">Height:</span> {datas?.height}</p>
        <p><span className="font-semibold text-gray-700">Weight:</span> {datas?.weight}</p>
        <p><span className="font-semibold text-gray-700">Race:</span> {datas?.race}</p>
        <p><span className="font-semibold text-gray-700">Occupation:</span> {datas?.occupation}</p>
        <p><span className="font-semibold text-gray-700">Division (Present):</span> {datas?.presentDivision}</p>
        <p><span className="font-semibold text-gray-700">Division (Permanent):</span> {datas?.permanentDivision}</p>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-2">
        <p><span className="font-semibold text-gray-700">Father's Name:</span> {datas?.fathersName}</p>
        <p><span className="font-semibold text-gray-700">Mother's Name:</span> {datas?.mothersName}</p>
        <p><span className="font-semibold text-gray-700">Mobile:</span> {datas?.mobile}</p>
        <p><span className="font-semibold text-gray-700">Email:</span> {datas?.user|| "N/A"}</p>
        <p><span className="font-semibold text-gray-700">Expected Partner Age:</span> {datas?.expectedPartnerAge} years</p>
        <p><span className="font-semibold text-gray-700">Expected Partner Height:</span> {datas?.expectedPartnerHeight}</p>
        <p><span className="font-semibold text-gray-700">Expected Partner Weight:</span> {datas?.expectedPartnerWeight}</p>
      </div>
    </div>

    <div className="mt-6 flex justify-end">
      <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-all">
      Add Favorite
      </button>
    </div>
  </div>
</div>
  )
}
