import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

function FeedbackBox() {
  return (
    <div className='modal-background'>
        <div className="modal-box ">
            <div className="w-[90%] mx-auto mb-6">
                <div className="flex-between pb-3 pt-5 mb-2">
                    <h2 className='text-blue-800 font-semibold text-[20px]'>Feedback</h2>
                    <Image
                      src="/icons/arrow-shrink.png"
                      alt='Profile'
                      width={30}
                      height={30}
                    />
                </div>
                <div>
                    <Textarea placeholder='Write here .....' className='mb-8 h-24 placeholder:text-grey-200'/>
                    <RadioGroup
                        defaultValue='not-started'
                        className='space-y-3'
                    >
                        <div className="flex items-center gap-3">
                            <RadioGroupItem 
                                value="complete" id="r1" 
                                className='size-'
                            />
                            <Label htmlFor="r1">
                                <p className='text-red text-[18px]'>Action Required</p>
                            </Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem 
                                value="in-progress" id="r2" 
                                className=''
                            />
                            <Label htmlFor="r2">
                                <p className='text-yellow text-[18px]'>Needs Correction</p>
                            </Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem 
                                value="not-started" id="r3" 
                                className=''
                            />
                            <Label htmlFor="r3">
                                <p className='text-green text-[18px]'>Approve</p>
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
                    Finish Review
                </Button>
                
            </div>
        </div>

    </div>
  )
}

export default FeedbackBox