'use client'
import Feedback from "@/shared/components/HomePage/Feedback"
// import { toast } from "@/lib/toast"
import HomeHeader from "@/shared/components/HomePage/HomeHeader"
import Overview from "@/shared/components/HomePage/Overview"
import Tasks from "@/shared/components/HomePage/Tasks"
import ProtectedRoute from "@/shared/components/ProtectedRoute";

const Home = () => {
  return (
    <ProtectedRoute allowedRole="student">
      <div className="w-[95%] mx-auto -z-10 ">
        <HomeHeader/>
        <Overview/>
        <Tasks/>
        <Feedback/>
      </div>
    </ProtectedRoute>
  )
}

export default Home