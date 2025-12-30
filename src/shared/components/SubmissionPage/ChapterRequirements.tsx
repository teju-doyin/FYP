import React from 'react'
import Image from 'next/image';

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
const ChapterRequirements = () => {
  return (
    <div>
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
    </div>
  )
}

export default ChapterRequirements