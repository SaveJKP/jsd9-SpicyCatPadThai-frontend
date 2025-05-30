import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(false); // <-- ADD isUser State
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://katsubook-backend.onrender.com/api/auth/profile",

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
        "https://katsubook-backend.onrender.com/api/auth/logout",
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
