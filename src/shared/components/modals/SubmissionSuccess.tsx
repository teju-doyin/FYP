import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


function SubmissionSuccess() {
  return (
    <div className='modal-background inset-0'>
        <div className="modal-box mt-15 ">
            <div className="w-[90%] mx-auto mb-9">
                <div className="flex-between pb-3 pt-5">
                    <Image
                        src="/icons/checkmark-circle.png"
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
                    <h3 className='text-xl font-semibold text-[#181D27]'>Submission Successful</h3>
                    <p className='text-[#535862] mb-4'>Your supervisor will be notified so they can begin reviewing.</p>
                </div>
            </div>
            <div className=" flex flex-col w-[90%] mx-auto gap-4">
                <Link
                    href='/'
                >
                    <Button
                        variant="default"
                        className='py-6 w-full bg-blue-500 text-white text-lg hover:text-white'
                    >
                        <Image
                        src="/icons/home-white.png"
                        alt='Profile'
                        width={20}
                        height={20}
                        />
                        Go Home
                    </Button>
                </Link>
                
            </div>
        </div>

    </div>
  )
}

export default SubmissionSuccess