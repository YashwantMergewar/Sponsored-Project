import { deleteUser } from "@/api/user/userApi"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { FilePenLine, Trash2, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "sonner"

const ProfilePage = () => {
    const { user, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const [deleting, setDeleting] = useState(false)

    const handleDeleteAccount = async () => {
      try{
        setDeleting(true)
        await deleteUser();
        window.location.reload();
        toast.success("Account deleted successfully.")
        navigate("/auth")
      }catch(error){
        console.error("Delete account error:", error)
        toast.error(error.message || "Failed to delete account.")
      }finally{
        setDeleting(false)
      }
    }

  return (
    <div className="min-h-screen bg-gray-50">
      { isAuthenticated && user ?
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 ">
          <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-gray-600 mt-1">View your account information</p>
        </div>

      
      <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-violet-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user?.fullname}</h2>
                <p className="text-gray-600">{user?.role}</p>
              </div>
            </div>

            <div className="space-y-6 border-t pt-6">
              <div>
                <Label className="text-gray-600">Username</Label>
                <p className="text-lg text-gray-900 mt-1 text-left">{user?.username}</p>
              </div>
              <div>
                <Label className="text-gray-600">Email Address</Label>
                <p className="text-lg text-gray-900 mt-1 text-left">{user?.email}</p>
              </div>
              <div>
                <Label className="text-gray-600">Role</Label>
                <p className="text-lg text-gray-900 mt-1 text-left">{user?.role}</p>
              </div>
              {/* <div>
                <Label className="text-gray-600">Admin ID</Label>
                <p className="text-lg text-gray-900 mt-1">#{user?.id}</p>
              </div>
              <div>
                <Label className="text-gray-600">Total Voters Registered</Label>
                <p className="text-lg text-gray-900 mt-1"> voters</p>
              </div> */}
            </div>

            <div className="mt-6 pt-6 border-t flex justify-between gap-2">
                <button className="bg-violet-800 hover:bg-violet-500 cursor-pointer text-white font-bold py-2 px-4 rounded-xl">
                  <FilePenLine className="inline-block mr-2" />
                  Edit Profile
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="bg-red-600 p-2 hover:bg-red-500 cursor-pointer text-white rounded-xl">
                      <Trash2 className="inline-block mr-1" />
                      Delete Account
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete account</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-900">
                        Are you sure you want to delete your account? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer hover:bg-gray-400">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 cursor-pointer" disabled={deleting}>
                        {deleting ? 'Deleting...' : 'Delete'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div> :
      <div className="flex items-center justify-center h-screen">
          <p className="text-lg">Please log in to access the Profile Page.</p>
            <p>Redirecting to Login Page... </p>
            {setTimeout(() => {
              navigate("/auth");
              toast.warning(<b>Your session has expired!!</b>+"Please login to access Profile Page");
            }, 2000)}
        </div>
      }
    </div>
  )
}

export default ProfilePage
