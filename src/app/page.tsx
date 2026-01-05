'use client'
import Feedback from "@/shared/components/HomePage/Feedback"
// import { toast } from "@/lib/toast"
import HomeHeader from "@/shared/components/HomePage/HomeHeader"
import Overview from "@/shared/components/HomePage/Overview"
import Tasks from "@/shared/components/HomePage/Tasks"
import { useAuth } from "@/context/AuthContext";
import { useCurrentChapter } from "@/lib/getCurrentChapter";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import Loading from "@/shared/components/Loading"


const CenteredMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-center text-grey-600 text-sm md:text-base px-4">
      {children}
    </p>
  </div>
);

const Home = () => {
  const { user, loading:authLoading  } = useAuth();
  const { currentChapterNumber, currentChapterData, loading } =
  useCurrentChapter(user?.uid ?? null);
  const router = useRouter();

  if (authLoading) {
    return (
      <CenteredMessage>
        <Loading message="Please wait"/>
      </CenteredMessage>
    );
  }
  if (!user) {
    router.push("/login");
    return (
      <CenteredMessage>
        <Loading message="Redirecting to login..." />
      </CenteredMessage>
    );
  }
  if (loading) return (
    <CenteredMessage>
      <Loading message="Loading"/>
    </CenteredMessage>
  );
  if (!currentChapterData) 
    return (
    <CenteredMessage>
      <Loading message="No chapter data yet."/>
    </CenteredMessage>
  );
  
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