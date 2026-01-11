import { deleteUser, updateUser } from "@/api/user/userApi";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { FilePenLine, Trash2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const { user, isAuthenticated, fetchUser } = useAuth();
  const navigate = useNavigate();

  const [deleting, setDeleting] = useState(false);
  const [data, setData] = useState({
    fullname: "",
    username: "",
    email: ""
  });
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  // Ensure the dialog form is seeded whenever it's opened
  useEffect(() => {
    if (openUpdateDialog) {
      setData({
        fullname: user?.fullname ?? "",
        username: user?.username ?? "",
        email: user?.email ?? "",
      });
    }
  }, [openUpdateDialog, user]);

  useEffect(() => {
  if (!isAuthenticated) {
    const t = setTimeout(() => {
      navigate("/auth");
      toast.warning("Your session has expired. Please login again.");
    }, 2000);
    return () => clearTimeout(t);
  }
}, [isAuthenticated, navigate]);


  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };


  const handleDeleteAccount = async () => {
    try {
      setDeleting(true);
      await deleteUser();
      window.location.reload();
      toast.success("Account deleted successfully.");
      navigate("/auth");
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error(error.message || "Failed to delete account.");
    } finally {
      setDeleting(false);
    }
  };

  const handleOnSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {};
    ["fullname", "username", "email"].forEach((k) => {
      const nv = String(data[k] ?? "").trim();
      const ov = String(user?.[k] ?? "").trim();
      if (nv && nv !== ov) payload[k] = nv;
    });

    if (!Object.keys(payload).length) {
      toast.warning("No changes to update");
      return;
    }

    await updateUser(payload);
    await fetchUser();     
    setOpenUpdateDialog(false);
    toast.success("Profile updated successfully");
  } catch (err) {
    toast.error(err.message || "Update failed");
  }
};

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
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user?.fullname}
                  </h2>
                  <p className="text-gray-600">{user?.role}</p>
                </div>
              </div>

              <div className="space-y-6 border-t pt-6">
                <div>
                  <Label className="text-gray-600">Username</Label>
                  <p className="text-lg text-gray-900 mt-1 text-left">
                    {user?.username}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-600">Email Address</Label>
                  <p className="text-lg text-gray-900 mt-1 text-left">
                    {user?.email}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-600">Role</Label>
                  <p className="text-lg text-gray-900 mt-1 text-left">
                    {user?.role}
                  </p>
                </div>
              </div>

              <Dialog
                open={openUpdateDialog}
                onOpenChange={setOpenUpdateDialog}
              >
                
                <DialogContent>
                  <form onSubmit={handleOnSubmit}>
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="fullname"
                          name="fullname"
                          onChange={handleOnChange}
                          value={data?.fullname}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          onChange={handleOnChange}
                          value={data?.username}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          onChange={handleOnChange}
                          value={data?.email}
                        />
                      </div>
                    </div>
                    <DialogFooter className="mt-4">
                      <DialogClose asChild>
                        <Button className="cursor-pointer"
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </DialogClose>

                      <Button type="submit" className="cursor-pointer">Save changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row justify-between gap-2">
                <button
                  className="bg-violet-800 hover:bg-violet-500 cursor-pointer text-white font-bold py-2 px-4 rounded-xl"
                  onClick={() => {
                     setData({ 
                      fullname: user?.fullname ?? '', 
                      username: user?.username ?? '', 
                      email: user?.email ?? '' 
                    });
                    setOpenUpdateDialog(true);
                  }}
                >
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
                        Are you sure you want to delete your account? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer hover:bg-gray-400">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-red-600 cursor-pointer"
                        disabled={deleting}
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
};

export default ProfilePage;
