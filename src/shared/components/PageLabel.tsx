import Image from 'next/image'
import React from 'react'

function PageLabel({label}:{label: string}) {
  return (
    <header className='bg-white mb-4 fixed top-0 z-[99] w-full'>
        <div className='w-[95%] mx-auto flex-between items-center  pt-4 pb-2'>
            <Image
              src="/icons/arrow-left.png"
              alt='Profile'
              width={20}
              height={20}
            />
            <h2 className='w-[60%] mx-auto text-grey-300 font-medium text-[20px] text-center '>{label}</h2>
        </div>
    </header>
  )
}

export default PageLabel