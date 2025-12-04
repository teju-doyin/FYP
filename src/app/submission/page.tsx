import { Button } from '@/components/ui/button';
// import SubmissionSuccess from '@/shared/components/modals/SubmissionSuccess';
import PageLabel from '@/shared/components/PageLabel'
import Image from 'next/image';
import React from 'react';

interface Checklist {
  id: number;
  title: string;
}

const chapterChecklist: Checklist[] = [
  {
    id: 0,
    title: "System analysis."
  },
  {
    id: 1,
    title: "Functional & non-functional requirements."
  },
  {
    id: 2,
    title: "Feasibility study."
  },
  {
    id: 3,
    title: "System design methods."
  },
  {
    id: 4,
    title: "Development tools/technologies chosen."
  },
]

function Page() {
  return (
    <div className=''>
      <PageLabel 
        label = "Chapter Submission"
      />
      <section className="w-[95%] mx-auto mb-8">
        <p className='text-grey-600 text-[18px] mb-3'>Before you submit, make sure your Chapter 3 includes:</p>
        <li className='list-none'>
          {
            chapterChecklist.map((list)=>(
              <ul 
                key={list.id}
                className='flex gap-2 items-center mb-4 text-grey-400'
              >
                  <div>
                    <Image
                      src="/icons/checkmark.png"
                      alt='Profile'
                      width={20}
                      height={20}
                    />
                  </div>
                  <span>{list.title}</span>
              </ul>
            ))
          }
        </li>
      </section>
      <section className='card shadow w-[95%] mx-auto bg-white-50 py-8 rounded-[3px]'>
        <div className="w-[85%] mx-auto">
          <div className="bg-white border border-dashed rounded-[5px] h-[150px] mb-1">
                <input
                  type='file'
                  className='hidden'
                
                />
                <div className='h-full flex flex-col gap-2 justify-center items-center'>
                  <div>
                    <Image
                      src="/icons/folder.png"
                      alt='Profile'
                      width={20}
                      height={20}
                    />
                  </div>
                  <p className='text-grey-300 text-[12px]'>Click here to upload file</p>
                </div>
          </div>
          <p className='text-center text-[#9D9D9D] font-light mb-8 '>Documents accepted are <span className="font-medium">.docx</span> and <span className="font-medium">.pdf</span></p>
          <Button
          variant="secondary"
          className='b-secondary py-6 bg-blue-200 text-white text-lg hover:text-blue-500 w-full'
          >
            Submit
          </Button>
        </div>
      </section>
      {/* <SubmissionSuccess/> */}
    </div>
  )
}

export default Page