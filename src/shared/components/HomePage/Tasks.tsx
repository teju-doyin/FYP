import Image from 'next/image'
import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
function Tasks() {
  return (
    <div className='mb-8'>
        <div className=" flex-between">
            <h4 className='text-grey-300 '>Tasks <span className='bg-blue-50 text-blue-500 font-semibold p-1 rounded-full text-center ml-2'>10</span></h4>
            <Image
                src="/icons/collapse.png"
                alt='Profile'
                width={20}
                height={20}
            /> 
        </div>
        <div className="">
            <div className="line my-2"></div>
                <div className="flex-between">
                    <span className='w-[70%] text-[#828282] text-[14px]'>Title</span>
                    <span className='w-[30%] text-[#828282] text-[14px]'>Status</span>
                </div>
            <div className="line my-2"></div>
        </div>
        <div className="tasklist flex-between">
            <div className="w-[70%] flex gap-2">
                <span>
                    {/* logic: task checked */}
                    <Checkbox
                    className='data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500'
                    />
                </span>
                <span className='line-through text-[14px] text-grey-400 font-light'>
                    Start learning UIUX so start making money
                </span>
            </div>
            <div className="w-[30%] flex-between items-center">
                
                <div>
                    <Image
                        src="/icons/three-dots.png"
                        alt='Profile'
                        width={20}
                        height={20}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tasks