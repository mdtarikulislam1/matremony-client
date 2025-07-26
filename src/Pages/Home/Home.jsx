import React from 'react'
import Slider from './Slider'
import HowItWorks from './HowItWorks'
import SuccessCounter from './SuccessCounter'
import PremiumMembers from './PremiumMembers'

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Slider></Slider>
      <PremiumMembers></PremiumMembers>
      <HowItWorks></HowItWorks>
      <SuccessCounter></SuccessCounter>
    </div>
  )
}
