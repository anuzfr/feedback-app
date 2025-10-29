import { createContext, useContext, useState } from "react";
import { loginUser, signupUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = async (emailOrUsername, password) => {
    try {
      const data = await loginUser(emailOrUsername, password);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Login error in context:", error);
      throw error;
    }
  };

  const signup = async (email, password, username) => {
    try {
      const data = await signupUser(email, password, username);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Signup error in context:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
