import React, { createContext, useState, useMemo, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { CurrentUser } from '../types/user';

export interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  currentUser?: CurrentUser;
}

interface TokenPayload {
  exp: number;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  apn: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser>()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<TokenPayload>(token);
        const {firstname, lastname, role, email, exp, apn} = decodedToken 
        setCurrentUser({firstname, lastname, role, email, apn})
        if (exp * 1000 > Date.now()) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const contextValue = useMemo(() => ({
    isLoggedIn,
    login,
    logout,
    currentUser,
  }), [isLoggedIn, currentUser]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext}


