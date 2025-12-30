import React from 'react';
import PageLabel from '@/shared/components/PageLabel'
import DocumentView from '@/shared/supervisorComponents/SubmissionScreen/DocumentView';



function Page() {
  return (
    <div className=''>
      <PageLabel 
        label = "Document View"
      />
      <div  className='w-[95%] mx-auto'>
        <DocumentView/>
      </div>
    </div>
  )
}

export default Page