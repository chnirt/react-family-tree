import React, { createContext, useContext, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atoms";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useRecoilState(authState);

  useLayoutEffect(() => {
    setIsAuth(!!localStorage.getItem("accessToken"));
  }, [setIsAuth]);

  function login(user, token) {
    localStorage.setItem("accessToken", token);
    setIsAuth(true);
    return true;
  }

  function logout() {
    localStorage.removeItem("accessToken");
    setIsAuth(false);
    return true;
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
