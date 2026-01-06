import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Toaster } from "./components/ui/sonner"

const AppLayout = () => {
  return (
    <div>
        <Navbar />
        
        <main className="min-h-screen pt-20 sm:pt-24">
            <Outlet />
        </main>
        <Toaster />

        <div className="p-10 mt-8 text-center bg-neutral-900 text-white rounded-2xl border-0">
            &copy; 2024 Voter Registration Platform, Mahagao
        </div>
        
    </div>
  )
}

export default AppLayout
