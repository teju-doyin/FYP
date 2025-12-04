'use client';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

interface ProgressBar{
    progress: number;
}
function Overview({progress = 50}:ProgressBar) {
    const circleRadius = 60
    const circumference =  2 * Math.PI * circleRadius
    const progressStatus = circumference - (progress / 100) * circumference

  return (
    <div className='card shadow mb-8'>
        <div className='flex-between mb-2'>
            <h3 className='text-blue-800 font-light text-xl '>Chapter 3 - Methodology</h3>
            <div className="">
                <Image
                    src="/icons/more-info.png"
                    alt='Profile'
                    width={20}
                    height={20}
                />
            </div>
        </div>
        <div className="font-medium flex items-center gap-2 ">
              <div>
                  <Image
                        src="/icons/timer.png"
                        alt='Profile'
                        width={20}
                        height={20}
                    />
              </div>
          <div className="">
            <span className='text-grey-300 text-[13px] font-normal'>Due Date: </span> 
            <span className='text-grey-500 text-[15px] font-medium'>25 April, 2025</span> 
          </div>  
        </div>
        <div className="line"></div>
        <div className="flex-between">
            <div className="progress">
                <div className="relative w-36 h-36">
                    <svg className='w-full h-full rotate-[-90deg]' viewBox='0 0 150 150'>
                        <circle
                            cx="75"
                            cy="75"
                            r={circleRadius}
                            stroke='#B8BFCE'
                            strokeWidth='6'
                            fill='none'
                        />
                        <circle
                            cx="75"
                            cy="75"
                            r={circleRadius}
                            stroke='#1A3262'
                            strokeWidth='6'
                            fill='none'
                            strokeLinecap='round'
                            strokeDasharray={circumference}
                            strokeDashoffset={progressStatus}
                            className='transition-all duration-700 ease-in-out'
                        />
                    </svg>
                    <div className="absolute inset-0 flex justify-center items-center ">
                        <div className="font-nunito text-blue-500">
                            <p className="text-xl text-center font-bold">{progress}%</p>
                            <p className='text-[14px]'>Complete</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="milestones shadow bg-[#FAFAFA] w-[55%] p-2 rounded-[5px]">
                <div className="flex-between mb-2">
                    <h4 className='text-[#4B4C54] text-[14px]'>Milestones</h4>
                    {/* logic: manage goes somewhere */}
                    <Link
                    href='/milestone'
                    >
                    <span className='underline text-blue-200 text-[14px]'>Manage</span>
                    </Link>
                </div>
                <div className="status section flex-between">
                    {/* logic: map function here */}
                    <div className="status shadow p-2 bg-white border-[#4B4C54] rounded-[5px]">
                        <span className='text-[#02030E] font-semibold text-lg text-[20px] ml-1'>9</span>
                        <div className='flex gap-1 items-center'>
                            <span className='dot bg-orange'></span>
                            <p className='text-orange text-[12px]'>In Progress</p>
                        </div>
                    </div>
                    <div className="status shadow p-2 bg-white border-[#4B4C54] rounded-[5px]">
                        <span className='text-[#02030E] font-semibold text-lg text-[20px] ml-1'>4</span>
                        <div className='flex gap-1 items-center'>
                            <span className='dot bg-grey-300 '></span>
                            <p className='text-grey-300 text-[12px]'>Not started</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Overview