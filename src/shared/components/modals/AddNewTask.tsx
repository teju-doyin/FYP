import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

function AddNewTask() {
  return (
    <div className='modal-background'>
        <div className="modal-box">
            <div className="w-[90%] mx-auto mb-7">
                <div className="flex-between items-center pb-3 pt-5">
                    <h2 className='font-semibold text-[#181D27] text-xl'>Add a new task</h2>
                    <Image
                      src="/icons/close.png"
                      alt='Profile'
                      width={20}
                      height={20}
                    />
                </div>
                <div>
                    <p className='text-[#414651] font-medium text-sm mb-2'>Task Name*</p>
                    <Input type='text' placeholder='Organize data collected' className='py4 h-12 placeholder:text-grey-200'/>
                </div>
            </div>
            <div className=" flex flex-col w-[90%] mx-auto gap-4">
                <Button
                    variant="default"
                    className='py-6 bg-blue-500 text-white text-lg hover:text-blue-500'
                >
                    
                    Save
                </Button>
                
            </div>
        </div>
    </div>
  )
}

export default AddNewTask