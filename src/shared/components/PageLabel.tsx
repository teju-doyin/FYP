"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";


type PageLabelProps = {
  label: string;
  backTo?: string;
};

function PageLabel({ label, backTo }: PageLabelProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backTo) {
      router.push(backTo); // go to the specific screen passed in
    } else {
      router.back(); // fall back to browser history if nothing passed
    }
  };

  return (
    <header className='bg-white mb-4 fixed top-0 z-[99] w-full'>
        <div className='w-[95%] mx-auto flex-between items-center  pt-4 pb-2'>
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center justify-center cursor-pointer"
              aria-label="Go back"
            >
              <Image
                src="/icons/arrow-left.png"
                alt="Back"
                width={20}
                height={20}
              />
            </button>
            <h2 className='w-[60%] mx-auto text-grey-300 font-medium text-[20px] text-center '>{label}</h2>
        </div>
    </header>
  )
}

export default PageLabel