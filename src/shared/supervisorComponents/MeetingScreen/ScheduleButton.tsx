import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const ScheduleButton = () => {
  return (
    <div className='flex justify-end mr-2 '>
        <Button
        className='py-6 px-2 bg-blue-50 rounded-sm'>
            <Image
             src="/icons/calendar.png"
                alt='Profile'
                width={30}
                height={30}
            />
        </Button>
    </div>
  )
}

export default ScheduleButton