'use client'
import Feedback from "@/shared/components/HomePage/Feedback"
// import { toast } from "@/lib/toast"
import HomeHeader from "@/shared/components/HomePage/HomeHeader"
import Overview from "@/shared/components/HomePage/Overview"
import Tasks from "@/shared/components/HomePage/Tasks"
import { useAuth } from "@/context/AuthContext";
import { useCurrentChapter } from "@/lib/getCurrentChapter";
import ProtectedRoute from "@/shared/components/ProtectedRoute";

const Home = () => {
  const { user } = useAuth(); // assumes user?.uid
  const { currentChapterNumber, currentChapterData, loading } =
  useCurrentChapter(user?.uid ?? null);
  
  if (loading) return <p>Loading...</p>;
  if (!currentChapterData) return <p>No chapter data yet.</p>;
  
  return (
    <ProtectedRoute allowedRole="student">
      <div className="w-[95%] mx-auto -z-10 ">
        <HomeHeader/>
        <Overview chapter={currentChapterData} />
        <Tasks/>
        {/* <Feedback/> */}
      </div>
    </ProtectedRoute>
  )
}

export default Home