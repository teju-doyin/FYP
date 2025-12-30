import Image from 'next/image'
import React from 'react'
import AvatarStack from './AvatarStack'

const attendees = [
  {
    id: "1",
    name: "Ada Lovelace",
    avatarUrl: "/pfp.png",
  },
  {
    id: "2",
    name: "Grace Hopper",
    avatarUrl: "/pfp-2.png",
  },
  {
    id: "3",
    name: "Alan Turing",
    avatarUrl: "/pfp-3.png",
  },
  {
    id: "4",
    name: "Alan Turing",
    avatarUrl: "/pfp-3.png",
  },
]
function HistoryMeetingCard
() {
  return (
    <div className='mb-16'>
        <div className='flex gap-1 '>
            <span className='text-grey-400 font-light mb-2'>Today</span>
        </div>
        <div className="card shadow py-3 mb-5 flex flex-col ">
            <div className="flex-between gap-1 items-start mb-5">
                <div className="">
                    <p className="text-blue-800 text-[16px] max-w-[15rem] font-medium mb-2 ">Discuss Chapter 3 with 500L students </p>
                    <div className="flex ">
                        <span className='text-[14px] text-grey-100'>Friday Sept 7, 2025</span>
                        <div className="line-vertical h-[20px] bg-blue-200"></div>
                        <span className='text-[14px] text-grey-100'>10:00am</span>
                    </div>
                </div>
                <Image
                    src="/icons/three-dots-vertical.png"
                    alt='Profile'
                    width={30}
                    height={30}
                />
            </div>
            <div className="self-end">
                <AvatarStack attendees={attendees} maxVisible={3} />
            </div>
        </div>
    </div>
  )
}

export default HistoryMeetingCard
