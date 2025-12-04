import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function MeetingTab() {
  return (
    <div className='mb-16'>
        <div className='flex gap-1 '>
            <div>
                <Image
                  src="/icons/hourglass.png"
                  alt='Profile'
                  width={20}
                  height={20}
                />
            </div> 
            <span className='text-grey-400 font-light mb-2'>In 5 days</span>
        </div>
        <div className="card shadow py-3 flex-between ">
            <div className="flex gap-1 items-center ">
                <div className='flex flex-col justify-around gap-'>
                    <span className='text-[16px] text-blue-500 font-semibold'>10:00 am</span>
                    {/* <span className='text-[14px] text-grey-100 text-center'></span> */}
                    <span className='text-[14px] text-grey-100'>11:00 am</span>
                </div>
                <div className="line-vertical bg-blue-500"></div>
                <p className="text-grey-400 text-[14px] max-w-[60%]">Weekly check in with supervisor </p>
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

export default MeetingTab