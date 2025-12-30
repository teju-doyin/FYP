import React from 'react'
import PageLabel from '@/shared/components/PageLabel'
import StudentCard from '@/shared/supervisorComponents/StudentsScreen/StudentCard'
const Students = () => {
  return (
    <div>
      <PageLabel 
        label = "Students"
      />
      <div  className='w-[95%] mx-auto'>
        <StudentCard/>
      </div>
    </div>
  )
}

export default Students