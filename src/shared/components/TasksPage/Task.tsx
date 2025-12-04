import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import React from 'react';

interface Task{
    id:number;
    title:string;
    tag:number;
    // statusComplete:boolean;
}
//notstarted=0, inprogress=1, complete=2
const tasksList: Task[] = [
    {
        id:0,
        title: "Fix ER diagram",
        tag: 1
    },
    {
        id:1,
        title: "Expand data collection section",
        tag: 1
    },
    {
        id:2,
        title: "Include ethical considerations",
        tag: 0
    },
    {
        id:3,
        title: "Add Feasibility study",
        tag: 2
    }
]
function Task() {
  return (
    <div>
        {
            tasksList.map((task)=>(
                <div 
                    key={task.id}
                    className="card flex-between items-start mb-3"
                >
                    <div 
                        className='flex gap-3'
                    >
                        <Checkbox
                            className='mt-1.5 data-[state=checked]:text-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:bg-[#F9F5FF] border border-blue-100  bg-[#F9F5FF] size-6'
                        />
                        <div>
                            <p 
                                className={
                                    `'text-grey-700 font-medium max-w-[250px] mb-0.5'
                                    ${task.tag === 2 && "line-through text-grey-300"}`
                                }>
                                {task.title}
                            </p>
                            <div className=" flex items-center gap-1 opacity-80">
                                <span
                                 className={
                                    `dot ${
                                    task.tag === 0?
                                    "bg-orange":
                                    task.tag === 1?
                                    "bg-grey-300":
                                    "bg-green"}`}
                                >
                                </span>
                                <span
                                className={
                                    `text-xs ${
                                    task.tag === 0?
                                    "text-orange":
                                    task.tag === 1?
                                    "text-grey-300":
                                    "text-green"}`}
                                >
                                    {
                                        task.tag === 0?
                                        "Not Started":
                                        task.tag === 1?
                                        "In Progress":
                                        "Complete"
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Image
                            src="/icons/delete.png"
                            alt='Profile'
                            width={20}
                            height={20}
                        />
                        <Image
                            src="/icons/three-dots.png"
                            alt='Profile'
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
            ))
        }
        <Button
            variant="secondary"
            className='py-3 px-1.5 mt-5 bg-blue-50 text-blue-500 text-lg font-medium rounded-[3px]'
        >
            <Image
                src="/icons/add.png"
                alt='Profile'
                width={20}
                height={20}
            />
            New Task
        </Button>
    </div>
  )
}

export default Task