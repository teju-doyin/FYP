'use client'
import React from 'react'
import Image from 'next/image'
import { formatStringDate } from '@/lib/utils';
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';
function SupervisorHomeHeader() {
  const today = formatStringDate()
  const { user } = useAuth();
  const role = user?.role ?? "Supervisor";
  const title = user?.title ?? "Supervisor";
  const firstName = user?.firstName ?? "Supervisor";
  const lastName = user?.lastName ?? "Supervisor";
  return (
    <div className='flex justify-between items-center mt-5 mb-10'>
      <div className='flex gap-3'>
        <Image
          src="/supervisor-pfp.png"
          alt='Profile'
          width={50}
          height={50}
        />
        <div>
          <p className='font-semibold text-[16px] text-grey-500'>Welcome {role === "student"? firstName + " "+ lastName : title + " "+ lastName}</p> {/* dynamic user's name  */}
          <p className='font-light text-grey-700'>{today}</p> {/* dynamic date */}
        </div>
      </div>
      <div className='p-2 rounded-sm bg-[#F2F2F2] relative'>
        <Link
          href="/supervisor/notifications"
        >
          <Image
            src="/icons/notification-bell.png"
            alt='Profile'
            width={20}
            height={20}
            />
          </Link>
        <span className='p-1 bg-red rounded-full absolute top-2 right-2'></span>
      </div>
    </div>
  )
}

export default SupervisorHomeHeader