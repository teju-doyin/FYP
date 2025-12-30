'use client'
import Image from 'next/image'
import React from 'react'
import { formatStringDate } from '@/lib/utils';
import { useAuth } from "@/context/AuthContext";

function HomeHeader() {
  const today = formatStringDate()
  const { user } = useAuth();
  const firstName = user?.firstName ?? "Student";

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
          <p className='font-semibold text-[16px] text-grey-500'>Welcome {firstName}</p> {/* dynamic user's name  */}
          <p className='font- text-grey-700'>{today}</p>
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