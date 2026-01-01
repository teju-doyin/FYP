import React from 'react'
import PageLabel from '@/shared/components/PageLabel'
import NotificationsMenu from '@/shared/components/NotificationPage/NotificationMenu'
const NotificationPage = () => {
  return (
    <div>
      <PageLabel 
        label = "Notifications"
      />
      <div  className='w-[95%] mx-auto mt-18'>
        <NotificationsMenu/>
      </div>
    </div>
  )
}

export default NotificationPage