import React from 'react'
import PageLabel from '@/shared/components/PageLabel'
import Feedback from '@/shared/components/FeedbackPage/Feedback'

function page() {
  return (
    <div>
      <PageLabel
        label = "Feedback"
        />
        <div className="w-[95%] mx-auto mt-18 mb-30">
          <Feedback/>
        </div>
    </div>
  )
}

export default page