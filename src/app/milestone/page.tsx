import React from 'react'
import Image from 'next/image';
import PageLabel from '@/shared/components/PageLabel'
import { Checkbox } from '@/components/ui/checkbox';

interface Milestone {
  id: number;
  title: string;
  description: string;
  status: number;
}
//not started= 0, in progress=1, complete=2
const milestones: Milestone[] = [
  {
    id: 0,
    title: "Research Design Written",
    description: "This is your research design",
    status: 2
  },
  {
    id: 1,
    title: "Requirements & Analysis Documented",
    description: "Functional & non-functional requirements listed.",
    status: 1
  },
  {
    id: 2,
    title: "System Design Completed",
    description: "The System Design and diagrams included",
    status: 0
  },
  {
    id: 3,
    title: "Tools & Technologies .",
    description: "System design methods.",
    status: 0
  },
  {
    id: 4,
    title: "Draft Ready for Submission",
    description: "Final draft with all boxes checked",
    status: 0
  },
]
const Milestones = () => {
  return (
    <div>
        <PageLabel
            label = "Milestones"
        />
        <div className='flex gap-2 items-center text-center justify-center mb-5'>
            <div>
                <Image
                    src="/icons/progress.png"
                    alt='Profile'
                    width={30}
                    height={30}
                />
            </div>
            <p className='text-grey-700 text-lg'>
                <span className='font-semibold'>1</span> out of <span className='font-semibold'>5</span> milestones complete
            </p>
        </div>
        <div className='w-[90%] mx-auto'>
            { milestones.map((milestone)=>(
            <div
                key={milestone.id}
                className='flex gap-4 items-center mb-4'
            >
                <Checkbox
                    className={`border data-[state=checked]:text-white data-[state=checked]:bg-green data-[state=checked]:border-green size-6 rounded-full
                        ${
                            milestone.status === 0? 
                            "border-grey-200":
                            milestone.status === 1? 
                            "border-orange": 
                            "text-white bg-green border-green"}
                        
                `}
                checked = {milestone.status === 2}
                />
                
                <div className="card w-[30rem] py-2">
                    <div className='flex-between items-start'>
                        <h3
                            className='text-grey-600 font-semibold text-lg'
                        >
                            {milestone.title}
                        </h3>
                        <Image
                            src="/icons/arrow-up.png"
                            alt='Profile'
                            width={30}
                            height={30}
                        />
                    </div>
                    <p
                        className='text-[14px] font-light w-[18rem] mb-4'
                    >{milestone.description}</p>
                    <div className="flex-between items-center">
                        <span className={` p-1.5 rounded-[3px] text-[12px] 
                            ${
                            milestone.status === 0? 
                            "bg-[#4B4C54]/6 text-grey-300":
                            milestone.status === 1? 
                            "bg-[#FAECE4] text-orange": 
                            "text-green bg-[#E1F0E6]"}`}
                            >
                                {
                                    milestone.status === 0? 
                                    "Not Started":
                                    milestone.status === 1? 
                                    "In Progress": 
                                    "Complete"
                                }
                        </span>
                        <Image
                            src="/icons/edit.png"
                            alt='Profile'
                            width={25}
                            height={25}
                        />
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Milestones