import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
function DeleteTask() {
  return (
    <div className='modal-background'>
        <div className="modal-box ">
            <div className="w-[90%] mx-auto mb-6">
                <div className="flex-between pb-3 pt-5 mb-2">
                    <Image
                        src="/icons/delete-circle.png"
                        alt='Profile'
                        width={50}
                        height={50}
                    />
                    <Image
                      src="/icons/close.png"
                      alt='Profile'
                      width={20}
                      height={20}
                    />
                </div>
                <div>
                    <h3 className='text-xl font-light text-[#181D27] mb-1'>Delete <span className='font-semibold'>"Fix ER diagram"</span></h3>
                    <p className='text-[#535862] mb-4'>Are you sure you want to delete this task? This action cannot be undone.</p>
                </div>
            </div>
            <div className=" flex flex-col w-[90%] mx-auto gap-4">
                 <Button
                    variant="destructive"
                    className='py-6 bg-red text-white text-lg'
                >
                    Delete
                </Button>
                <Button
                    variant="outline"
                    className='py-6 text-lg text-blue-800'
                >
                    Cancel
                </Button>
                
            </div>
        </div>

    </div>
  )
}

export default DeleteTask