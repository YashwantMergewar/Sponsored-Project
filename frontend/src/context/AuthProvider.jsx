import {useContext, useEffect, useState, useCallback} from "react"
import { AuthContext } from "./AuthContext";
import api from "@/api/setupAxios";
import { toast } from "sonner";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
//   const navigate = useNavigate()

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await api.get('/users/profile');
      setUser(data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = async () => {
    try {
      await api.post('/users/logout');
      setUser(null);
      toast.success("Logged Out..!")
    //   navigate('/auth');

    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, fetchUser, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);