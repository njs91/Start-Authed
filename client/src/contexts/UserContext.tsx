import React, { createContext, FC, ReactNode, useState } from 'react';

export const UserContext = createContext<UserContextType>(null);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserContextType>(null);
    return <UserContext.Provider value={user}>{children} </UserContext.Provider>;
};

type User = {
    email: string;
    password: string;
};
export type UserContextType = User | null;
interface UserProviderProps {
    children: ReactNode;
}
