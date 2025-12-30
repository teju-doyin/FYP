import React from 'react'
interface Tag{
    id:number;
    title: string;
    count: number;
    active: boolean;
}

const tags: Tag[]=[
    {
        id:0,
        title: "All",
        count: 6,
        active: true
    },
    {
        id:1,
        title: "Pending",
        count: 3,
        active: false
    },
    {
        id:2,
        title: "In Review",
        count: 1,
        active: false
    },
    {
        id:3,
        title: "Done",
        count: 2,
        active: false
    }
]
function Filter() {
  return (
    <div className='flex items-center gap-4 mb-6'>
        {tags.map((tag)=>(

        <div 
            key={tag.id}
            className="flex items-center"
        >
            <div className="flex gap-2 items-center">
                <span
                    className={`${tag.active === true? "text-blue-500 text-[16px] font-medium":"text-grey-300 text-[14px] font-light"}`}
                >{tag.title}</span>
                <span
                    className={`  py-0.5 px-2 rounded-full ${tag.active === true? "text-white bg-blue-500 text-[14px] font-medium":"text-blue-200 bg-blue-50 text-[12px]"}`}
                >{tag.count}</span>
            </div>
            {((tag.active===true && tag.title === "All") || tag.title === "All") && <div className="line-vertical bg-[#BCBDBE]/60 h-[18px] ml-2"></div>}
        </div>
        ))}
        
    </div>
  )
}

export default Filter