import React, { createContext, useState } from "react";

interface UserContextProps {
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext({} as UserContextProps);

interface UserContextProviderProps {
  children: any;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState(false);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
