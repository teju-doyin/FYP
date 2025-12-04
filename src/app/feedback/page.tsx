import React from 'react'
import PageLabel from '@/shared/components/PageLabel'
import Feedback from '@/shared/components/FeedbackPage/Feedback'

function page() {
  return (
    <div>
      <PageLabel
        label = "Feedback"
        />
      <Feedback/>
    </div>
  )
}

export default page