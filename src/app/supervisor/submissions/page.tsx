import FeedbackBox from '@/shared/components/modals/FeedbackBox'
import PageLabel from '@/shared/components/PageLabel'
import DocumentView from '@/shared/supervisorComponents/SubmissionScreen/DocumentView'
import Filter from '@/shared/supervisorComponents/SubmissionScreen/Filter'
import Submission from '@/shared/supervisorComponents/SubmissionScreen/Submission'
import React from 'react'

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
    // <div>
    //   <PageLabel 
    //     label = "Document View"
    //   />
    //   <div  className='w-[95%] mx-auto'>
    //     <DocumentView/>
    //     {/* <FeedbackBox/> */}
    //   </div>
    // </div>
  )
}

export default Submissions