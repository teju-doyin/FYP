import React from 'react'
import Image from 'next/image'
import Comments from './Comments';
import { Button } from '@/components/ui/button';

interface Todo{
  id:number;
  todo: string
}
interface Feedback {
  id: number;
  date: string;
  chapterId: number;
  chapterName: string;
  status: number;
  feedbackTodo: Todo[];
}
//action required= 0, needs correction=1, approved=2
const listOfFeedback: Feedback[] = [
  {
    id: 0,
    date: "Today",
    chapterId: 3,
    chapterName: "Methodology",
    status: 0 ,
    feedbackTodo: [
      {
          id:0,
          todo:"Add a brief explanation of why this tool is suitable for your project"
      },
      {
          id:1,
          todo:"Provide a clear diagram for your system design"
      }]

  },
  // {
  //   id: 1,
  //   date: "March 12",
  //   chapterId: 2,
  //   chapterName: "Literature Review",
  //   status: 2 ,
  //   feedbackTodo: [
  //     {
  //         id:0,
  //         todo:"Great work, go ahead with the methodology"
  //     }]

  // },
  // {
  //   id: 2,
  //   date: "March 1",
  //   chapterId: 2,
  //   chapterName: "Literature Review",
  //   status: 1 ,
  //   feedbackTodo: [
  //     {
  //         id:0,
  //         todo:"Recheck APA references in section 2.3"
  //     },
  //     {
  //         id:1,
  //         todo:"Replace at least two sources with more recent studies (from the last 5 years)."
  //     }]

  // }
]
const Feedback = () => {
  return (
    <div className="w-[95%] mx-auto">
        <div>
          {listOfFeedback.map((feedback)=>(
            <div
              className="mb-4"
              key={feedback.id}
            >
              <p className='text-grey-600 font-light mb-1'>{feedback.date}</p>
              <div className="card py-2">
                <div className='flex-between items-end mb-2'>
                  <h2 className="text-grey-500">Chapter {feedback.chapterId} - {feedback.chapterName}</h2>
                  <div className="tag flex">
                    <p className={`${
                       feedback.status === 0?
                          "bg-[#FDE6E6]":
                          feedback.status === 1?
                          "bg-[#FFFAE5]":
                          "bg-[#0B9F1E]/10"
                        }
                    flex gap-1 items-end p-1 rounded-[3px]`}>
                      <div>
                          <Image
                          src={`/icons/${
                             feedback.status === 0?
                              "action-required":
                              feedback.status === 1?
                              "warning":
                              "approved"
                          }.png`}
                          alt='tag'
                          width={20}
                          height={20}
                          />
                      </div>
                      <span
                        className={`text-[12px]
                          ${ feedback.status === 0?
                          "text-red":
                          feedback.status === 1?
                          "text-yellow":
                          "text-green"}
                          ${
                             feedback.status === 0?
                              "action-required":
                              feedback.status === 1?
                              "warning":
                              "approved"
                          }`}
                        >
                        {
                          feedback.status === 0?
                          "Action Required":
                          feedback.status === 1?
                          "Needs Correction":
                          "Approved"
                        }
                        </span>
                    </p>
                  </div>
                </div>
                <li className='list-none mb-3'>
                    {
                      feedback.feedbackTodo.map((todo)=>(
                          <ul
                              key={todo.id}
                              className='flex items-start gap-1 mb-1'
                          >
                              <span className='dot bg-grey-200 mt-2'></span>
                              <span className='text-[14px] font-light text-grey-600'>{todo.todo}</span>
                          </ul>
                      ))
                    }
                  </li>
                <Button
                    variant="default"
                    className='py-2 px-1.5 mt-5 bg-blue-500 text-white text-[12px] rounded-[3px] mr-auto'
                >
                    <div>
                        <Image
                            src="/icons/change.png"
                            alt='Profile'
                            width={15}
                            height={15}
                        />
                    </div>
                    Turn to Task
                </Button>
                <div className="line"></div>
                <Comments/>
                <p className='underline text-blue-500 text-[12px] text-right block font-semibold'>See more</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Feedback