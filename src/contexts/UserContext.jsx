import { createContext, useState } from "react";
import * as tokenService from "../services/tokenService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(tokenService.decodeToken());

  const handleSetUser = (token) => {
    tokenService.setToken(token);
    const decoded = tokenService.decodeToken();
    setUser(decoded);
  };

  const handleSignOut = () => {
    tokenService.removeToken();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, handleSetUser, handleSignOut }}>
      {children}
    </UserContext.Provider>
  );
};
