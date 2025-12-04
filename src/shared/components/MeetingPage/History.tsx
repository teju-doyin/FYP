import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

interface ActionPoint{
    id:number;
    task: string
}
interface Agenda{
    id:number;
    title:string;
    tag: string;
    date: string;
    actionPoints: ActionPoint[]
}

const meetingAgendas: Agenda[] = [
    {
        id:0,
        title: "Review of Chapter 2 Draft",
        tag:"Weekly check-in",
        date: "March 13",
        actionPoints:[
            {
                id:0,
                task:"Submit updated Chapter 2 by Aug 25"
            },
            {
                id:1,
                task:"Add 2 new references (2019 - 2024)"
            },
            {
                id:2,
                task:"Format properly"
            },
        ]
    }
]
function History() {
  return (
    <div>
        <p className="text-grey-400 font-light mb-4">History</p>
        <div className="">
                {meetingAgendas.map((agenda)=>(
                    <div 
                        key={agenda.id}
                        className="card shadow py-2 px-2"
                    >
                        <div className="flex-between items-center mb-1">
                            <h2 className='text-grey-500'>{agenda.title}</h2>
                            <span className='text-grey-200 text-[14px] font-light'>{agenda.date}</span>
                        </div>
                        <p className='text-grey-200 text-[12px] font-light'>{agenda.tag}</p>
                        <div className="line"></div>
                        <div className="tasks mb-4">
                            <p className='text-blue-500 text-[12px] mb-1.5 font-semibold'>Action Points:</p>
                            <li className='list-none'>
                                {
                                    agenda.actionPoints.map((task)=>(
                                        <ul
                                            key={task.id}
                                            className='flex items-center gap-1 mb-1'
                                        >
                                            <span className='dot bg-grey-200'></span>
                                            <span className='text-[14px] font-light text-grey-600'>{task.task}</span>
                                        </ul>
                                    ))
                                }
                            </li>
                        </div>
                        <div className="flex-between items-end">
                            <Button
                                    variant="secondary"
                                    className='py- bg-blue-200 text-white  py-3 px-3 text-[12px] hover:text-blue-500'
                                >
                                    <Image
                                    src="/icons/tick.png"
                                    alt='Profile'
                                    width={16}
                                    height={16}
                                    />
                                    Added to tasks
                            </Button>
                            <span className='text-blue-500 underline font-semibold'>See less</span>
                        </div>
                    </div>
                ))}
        </div>
    </div>
  )
}

export default History