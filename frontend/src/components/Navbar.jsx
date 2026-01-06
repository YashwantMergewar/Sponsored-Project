import { Menu, X, User, LogOut, UserPen, KeyRound } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Navbar = () => {
  const { logout, isAuthenticated, authLoading } = useAuth();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  console.log("isAuthenticated: ", isAuthenticated);
  if(authLoading){
   return null
  }
  const navItems = [
    { label: "Register", to: "/register-voter" },
    { label: "Dashboard", to: "/voter/dashboard" },
    { label: "About", to: "/about" },
  ];
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-hidden border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center shrink-0">
            <Link to="/">
                <span className="text-xl tracking-tight bg-violet-800 rounded-4xl p-2 pb-3 text-white hover:text-violet-800 hover:bg-white hover:border-2 shadow-[0_20px_35px_-10px_rgba(124,58,237,0.65)] transition-all duration-300 ease-out hover:shadow-[0_12px_25px_-10px_rgba(124,58,237,0.55)] hover:translate-y-1 active:translate-y-2 active:shadow-[0_8px_15px_-8px_rgba(124,58,237,0.45)]">
                  Mahagoan Connect
                </span>
              </Link>
          </div>
          { isAuthenticated ?
            <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  end
                  to={item.to}
                  className={({ isActive }) => `hover:bg-violet-800 transition delay-75 duration-75 hover:text-white py-2 px-3 border-hidden rounded-md ${isActive && item.to !== '#' ? 'underline underline-offset-4 decoration-violet-800 decoration-4' : ''}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul> : 
            <ul className="hidden lg:flex ml-14 space-x-12">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => `hover:bg-violet-800 transition delay-75 duration-75 hover:text-white py-2 px-3 border-hidden rounded-md ${isActive && window.location.href !== '#' ? 'underline underline-offset-4 decoration-violet-800 decoration-4' : ''}`}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `hover:bg-violet-800 transition delay-75 duration-75 hover:text-white py-2 px-3 border-hidden rounded-md ${isActive && window.location.href !== '#' ? 'underline underline-offset-4 decoration-violet-800 decoration-4' : ''}`}
                >
                  About
                </NavLink>
              </li>
            </ul>
          }
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            {isAuthenticated ? (
              <div className="flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <User className="mr-6 mt-2 cursor-pointer"/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex w-full  items-center rounded-md px-3 py-2 text-sm cursor-pointer data-highlighted:bg-violet-800 data-highlighted:text-white focus:bg-violet-800 focus:text-white outline-none">
                      <UserPen color="black"/>
                      Profile
                     </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/user/change-password" className="flex w-full items-center rounded-md px-3 py-2 text-sm cursor-pointer data-highlighted:bg-violet-800 data-highlighted:text-white focus:bg-violet-800 focus:text-white outline-none">
                      <KeyRound color="black"/>
                      Change Password
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={logout} className="cursor-pointer rounded-md px-3 py-2 text-sm
                   data-highlighted:bg-red-800 data-highlighted:text-white focus:bg-red-800 focus:text-white outline-none">
                      <LogOut color="black"/>
                    Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
            <button onClick={toggleNavbar} aria-label={mobileDrawerOpen ? "Close menu" : "Open menu"} aria-expanded={mobileDrawerOpen} aria-controls="mobile-menu">
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>


        {mobileDrawerOpen && (
          <div id="mobile-menu" role="dialog" aria-modal="true" className="fixed left-0 top-16 w-full p-6 sm:px-6 flex flex-col items-start gap-4 lg:hidden z-50 bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20 rounded-2xl">
              
            <ul className="w-full flex flex-col items-start gap-3 text-gray-900">
              {isAuthenticated ?
              navItems.map((item, index) => (
                <li className="w-full" key={index}>
                  <NavLink
                    end
                    to={item.to}
                    className={({ isActive }) => `w-full text-left hover:bg-violet-800 transition delay-75 duration-75 hover:text-white py-2 px-3 border-hidden rounded-md ${isActive && item.to !== '#' ? 'underline underline-offset-4 decoration-violet-800 decoration-4' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )) : 
              <li className="flex flex-col items-center w-full gap-2">
                <NavLink
                  end
                  to="/"
                  className={({ isActive }) => `text-center hover:bg-violet-800 transition delay-75 duration-75 hover:text-white py-2 px-3 border-hidden rounded-md ${isActive ? 'underline underline-offset-4 decoration-violet-800 decoration-4' : ''}`}
                >
                  Home
                </NavLink>
                <NavLink
                  end
                  to="/about"
                  className={({ isActive }) => `text-center hover:bg-violet-800 transition delay-75 duration-75 hover:text-white py-2 px-3 border-hidden rounded-md ${isActive ? 'underline underline-offset-4 decoration-violet-800 decoration-4' : ''}`}
                >
                  About
                </NavLink>
              </li>
              }
            </ul>
            <div className="flex space-x-6 items-center justify-center mt-4 w-full">
              {isAuthenticated ? (
                <div className="flex flex-col">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <User className="cursor-pointer"/>
                    </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex w-full  items-center rounded-md px-3 py-2 text-sm cursor-pointer data-highlighted:bg-violet-800 data-highlighted:text-white focus:bg-violet-800 focus:text-white outline-none">
                      Profile
                     </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/change-password" className="flex w-full items-center rounded-md px-3 py-2 text-sm cursor-pointer data-highlighted:bg-violet-800 data-highlighted:text-white focus:bg-violet-800 focus:text-white outline-none">
                      Change Password
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={logout} className="cursor-pointer rounded-md px-3 py-2 text-sm
                   data-highlighted:bg-red-800 data-highlighted:text-white focus:bg-red-800 focus:text-white outline-none">Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
