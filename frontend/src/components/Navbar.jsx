import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate()
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  const navItems = [
    { label: "Home", to: "/home" },
    { label: "About", to: "#" },
    { label: "Contact", to: "#" },
  ];
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-hidden border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center shrink-0">
            {user?.role === "admin" ? (
              <Link to="/home">
                <span className="text-xl tracking-tight bg-violet-800 rounded-4xl p-2 pb-3 text-white hover:text-violet-800 hover:bg-white hover:border-2 shadow-[0_20px_35px_-10px_rgba(124,58,237,0.65)] transition-all duration-300 ease-out hover:shadow-[0_12px_25px_-10px_rgba(124,58,237,0.55)] hover:translate-y-1 active:translate-y-2 active:shadow-[0_8px_15px_-8px_rgba(124,58,237,0.45)]">
                  Mahagoan Connect
                </span>
              </Link>
            ) : (
              <Link to="/">
                <span className="text-xl tracking-tight bg-violet-800 rounded-4xl p-2 pb-3 text-white hover:text-violet-800 hover:bg-white hover:border-2 shadow-[0_20px_35px_-10px_rgba(124,58,237,0.65)] transition-all duration-300 ease-out hover:shadow-[0_12px_25px_-10px_rgba(124,58,237,0.55)] hover:translate-y-1 active:translate-y-2 active:shadow-[0_8px_15px_-8px_rgba(124,58,237,0.45)]">
                  Mahagoan Connect
                </span>
              </Link>
            )}
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                {user?.role === "admin" ? (
                  <Link
                    className="hover:bg-violet-800 transition delay-75 duration-75 hover:text-white py-2 px-3 border-hidden rounded-md"
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    className="hover:bg-violet-800  transition delay-75 duration-75 hover:text-white py-2 px-3 border-hidden rounded-md"
                    to={item.to}
                  >
                    {item.label} {/* display another buttons */}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            {user?.role === "admin" ? (
              <div className="flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="mr-6 mt-2">
                  <User />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="hover:bg-violet-800 hover:text-white rounded-xl" onClick={navigate("/profile")}>Profile</DropdownMenuLabel>
                    <DropdownMenuLabel className="hover:bg-violet-800 hover:text-white rounded-xl">Change Password</DropdownMenuLabel>
                    <DropdownMenuLabel className="hover:bg-red-800 hover:text-white rounded-xl" onClick={logout}>Logout</DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* <Button onClick={logout}>Logout</Button> */}
              </div>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="py-2 px-3 border rounded-md transition delay-75 duration-175 hover:bg-violet-800 hover:text-white"
                >
                  SignIn
                </Link>
                <Link
                  to="/auth"
                  className="py-2 px-3 rounded-xl bg-violet-800 text-white shadow-[0_20px_35px_-10px_rgba(124,58,237,0.65)] transition-all duration-300 ease-out hover:shadow-[0_12px_25px_-10px_rgba(124,58,237,0.55)] hover:translate-y-1 active:translate-y-2 active:shadow-[0_8px_15px_-8px_rgba(124,58,237,0.45)]"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 mt-4 w-full p-12 flex flex-col justify-evenly items-center lg:hidden z-50 bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20 rounded-2xl border-hidden">
            <ul>
              {navItems.map((item, index) => (
                <li className="flex" key={index}>
                  <Link
                    className="hover:bg-violet-800 transition delay-75 duration-75 hover:text-white py-2 px-3 border-hidden rounded-md"
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6 mt-8">
              {user?.role === "admin" ? (
                <div className="flex flex-col">
                  <Link
                    to="/profile"
                    title="Profile"
                    className="flex items-center mb-3 py-2 px-6 rounded-md hover:text-white hover:bg-black"
                  >
                    <User />
                  </Link>

                  <Button className="ml-2" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="py-2 px-3 border rounded-md transition delay-75 duration-175 hover:bg-violet-800 hover:text-white "
                  >
                    SignIn
                  </Link>
                  <Link
                    to="/auth"
                    className="py-2 px-3 rounded-xl bg-violet-800 text-white backdrop-blur-xl shadow-[0_20px_35px_-10px_rgba(124,58,237,0.65)] transition-all duration-300 ease-out hover:shadow-[0_12px_25px_-10px_rgba(124,58,237,0.55)] hover:translate-y-1 active:translate-y-2 active:shadow-[0_8px_15px_-8px_rgba(124,58,237,0.45)]"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
