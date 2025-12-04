'use client'
import Image from 'next/image'
import React from 'react'

function HomeHeader() {
  return (
    <div className='flex justify-between items-center mt-3 mb-5'>
      <div className='flex gap-3'>
        <Image
          src="/pfp.png"
          alt='Profile'
          width={50}
          height={50}
        />
        <div>
          <p className='font-semibold text-[16px] text-grey-500'>Welcome Sandrah</p> {/* dynamic user's name  */}
          <p className='font- text-grey-700'>Wednesday, 20 March 2025</p> {/* dynamic date */}
        </div>
      </div>
      <div className='p-2 rounded-sm bg-[#F2F2F2] relative'>
        <Image
          src="/icons/notification-bell.png"
          alt='Profile'
          width={20}
          height={20}
        />
        <span className='p-1 bg-red rounded-full absolute top-2 right-2'></span>
      </div>
    </div>
  )
}

export default HomeHeader