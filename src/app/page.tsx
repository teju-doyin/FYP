'use client'
import Feedback from "@/shared/components/HomePage/Feedback"
// import { toast } from "@/lib/toast"
import HomeHeader from "@/shared/components/HomePage/HomeHeader"
import Overview from "@/shared/components/HomePage/Overview"
import Tasks from "@/shared/components/HomePage/Tasks"

const Home = () => {
  return (
    <div className="w-[95%] mx-auto -z-10 ">
      <HomeHeader/>
      <Overview/>
      <Tasks/>
      <Feedback/>
    </div>
  )
}

export default Home