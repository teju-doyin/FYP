import React from 'react'
import PageLabel from '@/shared/components/PageLabel'
import Filter from '@/shared/supervisorComponents/SubmissionScreen/Filter'
import Submission from '@/shared/supervisorComponents/SubmissionScreen/Submission'

function Submissions() {
  return (
    <div>
      <PageLabel 
        label = "Submissions"
      />
      <div  className='w-[95%] mx-auto  mt-18'>
        <Filter/>
        <Submission/>
      </div>
    </div>
  )
}

export default Submissions