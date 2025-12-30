
import { Button } from '@/components/ui/button'
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
function UpcomingMeetingTab() {
  return (
    <div className='mb-16'>
        <div className='flex gap-1 '>
            <span className='text-grey-400 font-light mb-2'>Today</span>
        </div>
        <div className="card shadow py-3 flex-between items-end">
            <div className="flex gap-1 items-start w-[80%]">
                <div className='flex flex-col justify-around w-[35%]'>
                    <span className='text-[16px] text-blue-500 font-semibold'>10:00 am</span>
                    {/* <span className='text-[14px] text-grey-100 text-center'></span> */}
                    <span className='text-[14px] text-grey-100'>11:00 am</span>
                </div>
                <div className="line-vertical h-[90px] bg-blue-200"></div>
                <div className="">
                    <p className="text-grey-400 text-[16px] mb-2 ">Discuss Chapter 3 with 500L students </p>
                    <div className="attendees">
                        <AvatarStack attendees={attendees} maxVisible={3} />

                    </div>
                </div>
            </div>
            <Button 
                variant="secondary"
                className='b-secondary py-2 bg-blue-200 text-white text-[16px] hover:text-blue-500'
            > 
                Join 
            </Button>
        </div>
    </div>
  )
}

export default UpcomingMeetingTab