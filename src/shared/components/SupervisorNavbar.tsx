'use client'
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
// import SelectChapterModal from './modals/SelectChapterModal';

function SupervisorNavbar() {
  const pathname = usePathname()
  return (
    <>
    <div className='w-full fixed bottom-0 z-[99] bg-[#ffff] rounded-t-3xl shadow '>
      <nav className='w-[90%] mx-auto flex-between bg-white my-5'>
          <div>
            <Link
              href='/supervisor/home'
              className={`text-[14px] ${pathname === '/supervisor/home'? "nav-active" :'nav-inactive'}`}
            >
              <div className="w-full">
                <Image
                  src={`/icons/${pathname==='/supervisor/home'? "nav-home-active.png": "nav-home.png"}`}
                  alt='Profile'
                  className='mx-auto'
                  width={20}
                  height={20}
                  />
              </div>
              Home
            </Link>
          </div>
          <div>
            <Link
              href='/supervisor/students'
              className={`text-[14px] ${pathname === '/supervisor/students'? "nav-active" :'nav-inactive'}`}
            >
              <div className="w-full">
                <Image
                  src={`/icons/${pathname==='/supervisor/students'? "students-filled.png": "students.png"}`}
                  alt='Profile'
                  className='mx-auto'
                  width={20}
                  height={20}
                  />
              </div>
              Students
            </Link>
          </div>
          
          
          <div>
            <Link
              href='/supervisor/submissions'
              className={`text-[14px] ${pathname === '/supervisor/submissions'? "nav-active" :'nav-inactive'}`}
            >
              <div className="w-full">
                <Image
                  src={`/icons/${pathname==='/supervisor/submissions'? "submission-filled.png": "submission.png"}`}
                  alt='Profile'
                  className='mx-auto'
                  width={20}
                  height={20}
                  />
              </div>
              Submissions
            </Link>
          </div>
          <div>
            <Link
              href='/supervisor/meeting'
              className={`text-[14px] ${pathname === '/supervisor/meeting'? "nav-active" :'nav-inactive'}`}
            >
              <div className="w-full">
                <Image
                  src={`/icons/${pathname==='/supervisor/meeting'? "nav-meeting-active.png": "nav-meeting.png"}`}
                  alt='Profile'
                  className='mx-auto'
                  width={20}
                  height={20}
                  />
              </div>
              Meeting
            </Link>
          </div>
      </nav>
    </div>
      {/* <SelectChapterModal/> */}
    </>
  )
}

export default SupervisorNavbar