import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react'

interface Chapter {
  id: number;
  title: string;
  status: string;
  statusCode: number; 
}
//approved= 0, complete=1, not started=2
const chapters: Chapter[] =[
  {
    id: 0,
    title:"Introduction",
    status:"Approved",
    statusCode: 0
  },
  {
    id: 1,
    title:"Literature Review",
    status:"Approved",
    statusCode: 0
  },
  {
    id: 2,
    title:"Methodology",
    status:"Complete",
    statusCode: 1
  },
  {
    id: 3,
    title:"Implementation",
    status:"Not Started",
    statusCode: 2
  },
  {
    id: 4,
    title:"Summanry",
    status:"Not Started",
    statusCode: 2
  }
]
function SelectChapterModal() {
  return (
    <div className='modal-background'>
        <div className="modal-box">
            <div className="w-[90%] mx-auto pt-5">
                <p className='text-center text-[#535862] mb-4'>You can only submit the chapter with all milestones completed</p>
                {chapters.map((chapter)=>(
                    <li
                        key={chapter.id}
                        className='list-none'
                    >
                        <ul className='flex-between mb-3 items-center'>
                            <div className="flex gap-2 items-center">
                                <span>
                                    { chapter.statusCode === 0?
                                    <Checkbox 
                                        className='data-[state=checked]:bg-green data-[state=checked]:border-green'
                                    checked
                                    />: 
                                    chapter.statusCode === 1?
                                    <Checkbox
                                        className='border border-blue-200 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500'
                                    />:
                                    <Checkbox
                                        className='bg-grey-100'
                                    disabled/>}
                                </span>
                                <div className="text-grey-700">
                                    <span className=' text- font-semibold'>Chapter {chapter.id + 1} - </span>
                                    <span className='text-[15px] font-light'>{chapter.title}</span>
                                </div>
                            </div>
                            <span 
                                className={
                                    `text-xs ${
                                        chapter.statusCode === 0? 
                                        "text-green":
                                        chapter.statusCode === 1? 
                                        "text-blue-500": 
                                        "text-grey-200"}`}
                                >
                                    {chapter.status}
                                </span>
                        </ul>
                    </li>
                ))}
            </div>
            <div className="line"></div>
            <div className=" flex flex-col w-[90%] mx-auto gap-4">
                <Button
                    variant="secondary"
                    className='py-6 bg-blue-200 text-white text-lg hover:text-blue-500'
                >
                    Continue
                </Button>
                <Button
                    variant="outline"
                    className='py-6 text-lg text-blue-600'
                >
                    Cancel
                </Button>
            </div>
        </div>

    </div>
  )
}

export default SelectChapterModal