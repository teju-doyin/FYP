import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';


function SubmissionSuccess() {
  return (
    <div className='modal-background'>
        <div className="modal-box ">
            <div className="w-[90%] mx-auto mb-9">
                <div className="flex-between pb-3 pt-5">
                    <Image
                        src="/icons/checkmark-circle.png"
                        alt='Profile'
                        width={20}
                        height={20}
                    />
                    <Image
                      src="/icons/close.png"
                      alt='Profile'
                      width={20}
                      height={20}
                    />
                </div>
                <div>
                    <h3 className='text-xl font-semibold text-[#181D27]'>Submission Successful</h3>
                    <p className='text-[#535862] mb-4'>Your supervisor will be notified so they can begin reviewing.</p>
                </div>
            </div>
            <div className=" flex flex-col w-[90%] mx-auto gap-4">
                <Button
                    variant="default"
                    className='py-6 bg-blue-500 text-white text-lg hover:text-blue-500'
                >
                    <Image
                      src="/icons/home-white.png"
                      alt='Profile'
                      width={20}
                      height={20}
                    />
                    Go Home
                </Button>
                
            </div>
        </div>

    </div>
  )
}

export default SubmissionSuccess