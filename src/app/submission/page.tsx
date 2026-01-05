"use client"
import React from 'react';
// import SubmissionSuccess from '@/shared/components/modals/SubmissionSuccess';
import PageLabel from '@/shared/components/PageLabel'
import ChapterRequirements from '@/shared/components/SubmissionPage/ChapterRequirements';
import SelectFile from '@/shared/components/SubmissionPage/SelectFile';
import { useAuth } from "@/context/AuthContext";
import { useCurrentChapter } from "@/lib/getCurrentChapter";


function Page() {
    const { user } = useAuth(); // assumes user?.uid
  const { currentChapterData, loading } = useCurrentChapter(user?.uid ?? null);
  return (
    <div className=''>
      <PageLabel 
        label = "Chapter Submission"
        backTo="/"
      />
      <div className="w-[95%] mx-auto my-18">
        <ChapterRequirements chapter={currentChapterData} />
        <SelectFile/>
      </div>
      {/* <SubmissionSuccess/> */}
    </div>
  )
}

export default Page