import TaskTagChange from '@/shared/components/modals/TaskTagChange'
import PageLabel from '@/shared/components/PageLabel'
import Filter from '@/shared/components/TasksPage/Filter'
import Task from '@/shared/components/TasksPage/Task'
import React from 'react'

function page() {
  return (
    <div>
      <PageLabel
      label='Tasks'/>
      <div className="w-[95%] mx-auto">
        <Filter/>
        <Task/>
      </div>
      {/* <TaskTagChange/> */}
    </div>
  )
}

export default page