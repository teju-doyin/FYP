import React from 'react'
import PageLabel from '@/shared/components/PageLabel'
import Filter from '@/shared/supervisorComponents/MeetingScreen/Filter'
import UpcomingMeetingTab from '@/shared/supervisorComponents/MeetingScreen/UpcomingMeeting'
import HistoryMeeting from '@/shared/supervisorComponents/MeetingScreen/HistoryMeeting'
import ScheduleButton from '@/shared/supervisorComponents/MeetingScreen/ScheduleButton'
import ScheduleMeeting from '@/shared/supervisorComponents/MeetingScreen/ScheduleMeeting'
function page() {
  return (
    <div>
        {true?
            <div>
                <PageLabel 
                    label = "Meeting"
                />
                <div className="w-[95%] mx-auto">
                    <Filter/>
                    <UpcomingMeetingTab/>
                    <HistoryMeeting/>
                </div>
                <ScheduleButton/>
            </div>
            :
        <ScheduleMeeting/>
        }
    </div>
  )
}

export default page