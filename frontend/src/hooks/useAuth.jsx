import { useEffect, useState, createContext, useContext } from "react";
import myAxios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    myAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const verifyToken = async () => {
      try {
        const response = await myAxios.get("/user");
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await myAxios.post("/logout");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      delete myAxios.defaults.headers.common["Authorization"];

      navigate("/login");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };
  return logout ;
}
