import React, { useEffect, useState } from 'react'
import getSecureAxios from '../Shared/secureAxios'
import BiodataCard from './BiodataCard';
export default function Biodatas() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
   const axiosSecure = getSecureAxios();

  useEffect(() => {
    axiosSecure.get('/matremony/allData')
      .then(response => {
        setServices(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  }, []);

  if (loading) {
   return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="loading loading-dots loading-xl"></span>
    </div>
  );
  }

  return (
   <div className='my-10'>
    <h2 className='py-4 text-2xl font-semibold text-center'>Chose Your Partner</h2>
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 space-y-3 max-w-7xl mx-auto'>
        {
            services.map(service=><BiodataCard service={service} key={service?._id}></BiodataCard>)
        }
    </div>
   </div>
  )
}
