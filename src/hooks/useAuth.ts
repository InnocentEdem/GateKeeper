import { useContext } from "react";
import { CurrentUser } from "../types/user";
import { AuthContext } from "../contexts/AuthContext";

export interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  currentUser: CurrentUser;
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
  };

