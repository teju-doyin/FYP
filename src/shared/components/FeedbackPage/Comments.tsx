import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image'
import React from 'react'

interface comment{
  id:number;
  todo: string
}
interface Comment {
  userId: number;
  userName: string;
  userType: number; //0==student, 1=supervisor
  timeStamp: string;
  message: string;
  liked: boolean;
  reply: Comment[];
}
const commentThread: Comment[] = [
    {
        userId: 0,
        userName: "You",
        userType: 0 ,
        timeStamp:"14 min",
        message: "Noted, I’ll correct the diagram as soon as possible.",
        liked: true,
        reply: [
            {
                userId: 2,
                userName: "Prof. Adebowale",
                userType: 1,
                timeStamp:"Just Now",
                message: "Great, submit the update by Tuesday.",
                liked: false,
                reply: []
            }
        ]
    }
]
const Comments = () => {
  return (
    <div>
        <div className="flex-between items-center mb-3">
            <div className='flex gap-1 items-center'>
                <Image
                    src="/icons/comment.png"
                    alt='Profile'
                    width={20}
                    height={20}
                />
                <span className='text-grey-300'>Comments</span>
            </div>
            <Image
                src="/icons/arrow-up.png"
                alt='Profile'
                width={20}
                height={20}
            />
        </div>
        <div className="comment-1 mb-4">
            {commentThread.map((comment)=>(

            <div 
                key={comment.userId}
                className="header">
                <div className='flex-between items-end mb-2'>
                    <div className='flex gap-1'>
                       <div>
                           <Image
                            src={`/${comment.userType === 0? "pfp" : "supervisor-pfp"}.png`}
                            alt='Profile'
                            width={30}
                            height={30}
                            />
                       </div>
                       <span className='font-semibold text-blue-500'>{comment.userName}</span>
                    </div>
                    <span className='font-light text-[#B4BBC6]'>{comment.timeStamp}</span>
                </div>
                <p className='text-[#272727] font-light mb-2'>{comment.message}</p>
                <div className="flex-between items-center">
                    <div className='flex gap-1 items-end'>
                        <Image
                            src="/icons/reply.png"
                            alt='Profile'
                            width={20}
                            height={20}
                        />
                        <span className='text-[14px] text-[#8991A0]'>Reply</span>
                    </div>
                    <div>
                        <Image
                        src={`/icons/${comment.liked === true? "like-filled" : "like"}.png`}
                        alt='Profile'
                        width={20}
                        height={20}
                        />
                    </div>
                </div>
            </div>
            ))}

        </div>
        <div className="relative mb-3">
            <Input
                className='py-5.5 placeholder:font-light placeholder:text-[#9E9EA8]'
                placeholder='Type your comment here'
            />
            <Button
                variant='secondary'
                className='bg-blue-200 text-white px-3 py-1.5 absolute right-1 top-1.5'
            >
                Send
            </Button>
        </div>
    </div>
  )
}

export default Comments