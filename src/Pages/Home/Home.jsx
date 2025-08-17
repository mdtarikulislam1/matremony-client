import React from 'react'
import Slider from './Slider'
import HowItWorks from './HowItWorks'
import SuccessCounter from './SuccessCounter'
import PremiumMembers from './PremiumMembers'
import MatrimonySections from './MatremonySection'

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Slider></Slider>
      <PremiumMembers></PremiumMembers>
      <HowItWorks></HowItWorks>
      <SuccessCounter></SuccessCounter>
      <MatrimonySections></MatrimonySections>
    </div>
  )
}
