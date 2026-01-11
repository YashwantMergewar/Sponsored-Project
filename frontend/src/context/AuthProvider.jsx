import {useEffect, useState, useCallback} from "react"
import { AuthContext } from "./AuthContext";
import api from "@/api/setupAxios";
import { toast } from "sonner";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  // const [loading, setLoading] = useState(true);
//   const navigate = useNavigate()

  const fetchUser = useCallback(async () => {
    setAuthLoading(true);
    try {
      const { data } = await api.get('/users/profile');
      const fetchedUser = data?.user ?? null;
      setUser(fetchedUser);
      console.log(user);
      setIsAuthenticated(Boolean(fetchedUser));
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = async () => {
    try {
      await api.post('/users/logout');
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged Out..!");
    //   navigate('/auth');

    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, fetchUser, setUser, logout, isAuthenticated, authLoading, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

