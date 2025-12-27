import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { FilePenLine, Trash2, User } from "lucide-react"

const ProfilePage = () => {
    const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
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
                <button className="bg-red-600 p-2 hover:bg-red-500 cursor-pointer text-white rounded-xl">
                  <Trash2 className="inline-block mr-1" />
                  Delete Account
                </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage
