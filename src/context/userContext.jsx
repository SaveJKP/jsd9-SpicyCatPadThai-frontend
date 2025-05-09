import React, { createContext, useState, useEffect, useContext } from "react";

export const userContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(false); // <-- ADD isUser State
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            withCredentials: true,
          },
        );
        setUser(response.data.user);
        setIsUser(true); // <-- SET isUser to true
      } catch (err) {
        console.error("Not authenticated", err);
        setUser(null);
        setIsUser(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    navigate("/");
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      setUser(null);
      setIsUser(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout Failed:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, loading, isUser }}
    >
      {children}
    </AuthContext.Provider> // <-- ADD isUser to provider
  );
};

export const useAuth = () => useContext(AuthContext);
