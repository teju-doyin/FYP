import Image from 'next/image'
import React from 'react'
function Feedback() {
  return (
    <div>
        <h3 className='text-grey-300 font-light mb-4'>Recent Feedback</h3>
        <div className="card shadow">
            <div className="flex-between mb-2">
                <h3 className='text-blue-800 font-medium'>Chapter 2 - Literature Review</h3>
                <div className='flex gap-2 items-center'>
                    <div>
                        <Image
                        src="/icons/clock.png"
                        alt='Clock'
                        width={12}
                        height={12}
                        />
                    </div>
                    <span className='text-[12px]'>12 hours ago</span>
                </div>
            </div>
            <p className='text-grey-700 font-light text-[15px] mb-4 text-justify'> Lorem ipsum dolor sit,  praesentium dolor reiciendis a nisi quidem ad veniam numquam soluta deleniti?</p>
            <div className="tag flex-between">
                <p className='flex gap-1 items-end bg-[#FFFAE5] p-1 rounded-[3px]'>
                    <div>
                        <Image
                        src="/icons/warning-tag.png"
                        alt='Warning tag'
                        width={20}
                        height={20}
                        />
                    </div>
                    <span className='text-[12px] text-yellow '>Needs Correction</span>
                </p>
                <span className='underline text-blue-200 text-[10px]'>Read more</span>
            </div>
        </div>
    </div>
  )
}

export default Feedback