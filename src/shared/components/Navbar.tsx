'use client'
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
// import SelectChapterModal from './modals/SelectChapterModal';

// interface NavLink {
//   id: number;
//   link: string;
//   name: string;
// }
// const listOfLinks: NavLink[] =[
//   {
//     id: 0,
//     link:"/",
//     name:"Home"
//   },
//   {
//     id: 1,
//     link:"/feedback",
//     name:"Feedback"
//   },
//   {
//     id: 2,
//     link:"/submission",
//     name:"Submission"
//   },
//   {
//     id: 3,
//     link:"/tasks",
//     name:"Tasks"
//   },
//   {
//     id: 4,
//     link:"/meeting",
//     name:"Meeting"
//   }
// ]
function Navbar() {
  const pathname = usePathname()
  return (
    <>
    <div className='w-full fixed bottom-0 z-[99] bg-[#ffff] rounded-t-3xl shadow '>
      <nav className='w-[90%] mx-auto flex-between bg-white '>
          <div>
            <Link
              href='/'
              className={`text-[14px] ${pathname === '/'? "nav-active" :'nav-inactive'}`}
            >
              <div className="w-full">
                <Image
                  src={`/icons/${pathname==='/'? "nav-home-active.png": "nav-home.png"}`}
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
              href='/feedback'
              className={`text-[14px] ${pathname === '/feedback'? "nav-active" :'nav-inactive'}`}
            >
              <div className="w-full">
                <Image
                  src={`/icons/${pathname==='/feedback'? "nav-feedback-active.png": "nav-feedback.png"}`}
                  alt='Profile'
                  className='mx-auto'
                  width={20}
                  height={20}
                  />
              </div>
              Feedback
            </Link>
          </div>
          
          <div className="relative -top-6 border-4 rounded-full border-[#ffff]">
            <div className='p-4 bg-[#4E60D5]  border-4 rounded-full border-[#A9C0FF]'>
              <Link
                href='/submission'
                className={`text-[14px] ${pathname === '/submission'? "nav-active" :'nav-inactive'}`}
              >
                <div>
                  <Image
                    src={`/icons/${pathname==='/submission'? "nav-upload-active.png": "nav-upload.png"}`}
                    alt='Profile'
                    width={30}
                    height={30}
                  />
                </div>
              </Link>
            </div>
          </div>
          <div>
            <Link
              href='/tasks'
              className={`text-[14px] ${pathname === '/tasks'? "nav-active" :'nav-inactive'}`}
            >
              <div className="w-full">
                <Image
                  src={`/icons/${pathname==='/tasks'? "nav-tasks-active.png": "nav-tasks.png"}`}
                  alt='Profile'
                  className='mx-auto'
                  width={20}
                  height={20}
                  />
              </div>
              Tasks
            </Link>
          </div>
          <div>
            <Link
              href='/meeting'
              className={`text-[14px] ${pathname === '/meeting'? "nav-active" :'nav-inactive'}`}
            >
              <div className="w-full">
                <Image
                  src={`/icons/${pathname==='/meeting'? "nav-meeting-active.png": "nav-meeting.png"}`}
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

export default Navbar