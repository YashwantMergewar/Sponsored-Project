import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Toaster } from "./components/ui/sonner"

const AppLayout = () => {
  return (
    <div>
        <Navbar />
        
        <main className="min-h-screen sm:pt-10">
            <Outlet />
        </main>
        <Toaster />

        <div className="bottom-0 w-full h-80 flex items-center justify-center bg-neutral-900 text-white">
            <span>&copy; 2024 Voter Registration Platform, Mahagao</span>
        </div>
        
    </div>
  )
}

export default AppLayout
