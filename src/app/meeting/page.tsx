import React from 'react'
import PageLabel from '@/shared/components/PageLabel'
import History from '@/shared/components/MeetingPage/History'
import MeetingTab from '@/shared/components/MeetingPage/MeetingTab'
function page() {
  return (
    <div>
      <PageLabel 
        label = "Meeting"
        backTo="/" 
      />
      <div className="w-[95%] mx-auto my-18">
        <MeetingTab/>
        <History/>
      </div>
    </div>
  )
}

export default page