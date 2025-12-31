import React from 'react';
// import SubmissionSuccess from '@/shared/components/modals/SubmissionSuccess';
import PageLabel from '@/shared/components/PageLabel'
import ChapterRequirements from '@/shared/components/SubmissionPage/ChapterRequirements';
import SelectFile from '@/shared/components/SubmissionPage/SelectFile';



function Page() {
  return (
    <div className=''>
      <PageLabel 
        label = "Chapter Submission"
      />
      <div className="w-[95%] mx-auto">
        <ChapterRequirements/>
        <SelectFile/>
      </div>
      {/* <SubmissionSuccess/> */}
    </div>
  )
}

export default Page