import React from 'react'
import Slider from './Slider'
import HowItWorks from './HowItWorks'
import SuccessCounter from './SuccessCounter'

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Slider></Slider>
      <HowItWorks></HowItWorks>
      <SuccessCounter></SuccessCounter>
    </div>
  )
}
