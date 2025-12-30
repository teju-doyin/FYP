import React from 'react'
import HomeHeader from '@/shared/supervisorComponents/SupervisorHomeScreen/SupervisorHomeHeader'
import SupervisorOverview from '@/shared/supervisorComponents/SupervisorHomeScreen/SupervisorOverview'
import RecentActivity from '@/shared/supervisorComponents/SupervisorHomeScreen/RecentActivity'
import ProtectedRoute from "@/shared/components/ProtectedRoute";

function SupersorHome() {
  return (
    <ProtectedRoute allowedRole="supervisor">
      <div>
          <div  className='w-[95%] mx-auto'>
            <HomeHeader/>
            <SupervisorOverview/>
            <RecentActivity/>
          </div>
          {/* <StudentInfo/> */}
      </div>
    </ProtectedRoute>
  )
}

export default SupersorHome