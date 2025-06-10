'use client'
import { toast } from "@/lib/toast"

const Home = () => {
  return (
    <div className="h-svh w-screen flex items-center justify-center">
      <button className="bg-red-400 rounded-xl w-30 h-13" onClick={() => toast.warning("hiiii")}>Click me</button>
    </div>
  )
}

export default Home