import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

function TaskTagChange() {
  return (
    <div className='modal-background'>
        <div className="modal-box ">
            <div className="w-[90%] mx-auto mb-6">
                <div className="flex-between pb-3 pt-5 mb-2">
                    <Image
                        src="/icons/tag.png"
                        alt='Profile'
                        width={50}
                        height={50}
                    />
                    <Image
                      src="/icons/close.png"
                      alt='Profile'
                      width={30}
                      height={30}
                    />
                </div>
                <div>
                    <h3 className='text-xl font-light text-[#181D27] mb-4'>Change the tag on <span className='font-semibold'>&quot;Fix ER diagram&quot;</span></h3>
                    <RadioGroup
                        defaultValue='not-started'
                        className='flex flex-col gap-4'
                    >
                        <div className="flex items-center gap-3">
                            <RadioGroupItem 
                                value="complete" id="r1" 
                                className='size-'
                            />
                            <Label htmlFor="r1">
                                <p className='bg-[#F0F9FF] px-4  py-2 rounded-full text-[15px] font-normal text-green flex gap-2 items-center'>
                                    <span className='dot bg-green'></span>
                                    <span>Complete</span>
                                </p>
                            </Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem 
                                value="in-progress" id="r2" 
                                className=''
                            />
                            <Label htmlFor="r2">
                                <p className='bg-[#FF7C10]/10 px-4  py-2 rounded-full text-[15px] text-orange font-normal flex gap-2 items-center'>
                                    <span className='dot bg-orange'></span>
                                    <span>In Progress</span>
                                </p>
                            </Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem 
                                value="not-started" id="r3" 
                                className=''
                            />
                            <Label htmlFor="r3">
                                 <p className='bg-[#4B4C54]/6 px-4  py-2 rounded-full text-[15px] text-grey-300 font-normal flex gap-2 items-center'>
                                    <span className='dot bg-grey-300'></span>
                                    <span>Not Started</span>
                                </p>
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <div className=" flex flex-col w-[90%] mx-auto gap-4">
                <Button
                    variant="default"
                    className='py-6 text-lg bg-blue-500 text-white'
                >
                    Done
                </Button>
                
            </div>
        </div>

    </div>
  )
}

export default TaskTagChange