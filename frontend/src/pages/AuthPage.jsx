import { createUser, loginUser } from "@/api/user/userApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthProvider';

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const { fetchUser } = useAuth()
  const [error, setError] = useState("");
  let navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("SignIn");
  const [signInData, setSignInData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [data, setData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    if(activeTab === "SignIn"){
        setSignInData({
            ...signInData,
            [e.target.name]: e.target.value
        })
    }
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Only run registration when SignUp tab is active
    if (activeTab !== "SignUp") {
        try {
        setLoading(true);
        if(signInData.username.trim("") === "" && signInData.email.trim("") === ""){
            setError("Enter either Username or Email to access account..!")
        }

        const res = await loginUser(signInData)
        await fetchUser()
        console.log(res.user);

        setSignInData({ username: "", email: "", password: "" });
        navigate("/home")
        toast.success("Wecome to Admin Dashboard")
        } catch (err) {
            console.log(err.message);
            setError("Failed to access account..!" || err.message);
        } finally {
            setLoading(false);
        }
        return
    }

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match..!");
      return;
    }

    try {
      setLoading(true);
      const res = await createUser(data);
      toast.success(res.message);
      setData({ fullname: "", username: "", email: "", password: "", confirmPassword: "" });
      
    } catch (err) {
      setError(err.message || "Failed to create account..!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      {error && (<div className="mb-4 text-red-600 font-medium">{error}</div>)}
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="SignIn">
          <TabsList>
            <TabsTrigger value="SignIn">SignIn</TabsTrigger>
            <TabsTrigger value="SignUp">Create Account</TabsTrigger>
          </TabsList>

          <TabsContent value="SignIn">
            <Card>
              <CardHeader>
                <CardTitle>SignIn</CardTitle>
                <CardDescription>
                  The Signin authority is only applicable to Admin Only..!
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="signin-username">Username</Label>
                  <Input
                    id="signin-username"
                    name="username"
                    placeholder="Enter your Username"
                    value={signInData.username}
                    onChange={handleOnChange}
                    disabled={loading}
                  />
                </div>
                <span className="-mt-3 -mb-3 underline">OR</span>
                <div className="grid gap-3">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    name="email"
                    placeholder="Enter your Email"
                    value={signInData.email}
                    onChange={handleOnChange}
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    type="password"
                    id="signin-password"
                    name="password"
                    placeholder="Enter your Password"
                    value={signInData.password}
                    onChange={handleOnChange}
                    disabled={loading}
                    required
                  />
                </div>
              </CardContent>
              <div className="flex justify-center items-center">
                <Button type="submit" className="w-2xs" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? "Logging into account..." : "SignIn"}    
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="SignUp">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  The Create Account authority is only applicable to Admin
                  Only..!
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="fullname">Fullname</Label>
                  <Input
                    id="fullname"
                    name="fullname"
                    placeholder="Enter your Username"
                    onChange={handleOnChange}
                    value={data.fullname}
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter your Password"
                    onChange={handleOnChange}
                    value={data.username}
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your Email"
                    onChange={handleOnChange}
                    value={data.email}
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your Password"
                    onChange={handleOnChange}
                    value={data.password}
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Enter your Password Again"
                    onChange={handleOnChange}
                    value={data.confirmPassword}
                    disabled={loading}
                  />
                </div>
              </CardContent>
              <div className="flex justify-center items-center">
                <Button type="submit" className="w-2xs" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? "Creating Account..." : "Create Account"}    
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default AuthPage;
