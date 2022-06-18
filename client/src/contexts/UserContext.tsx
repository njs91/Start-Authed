import React, { createContext, FC, ReactNode, useState } from 'react';

export const UserContext = createContext<UserContextType>(null); // @todo *IMPORTANT* set from cookies if available?

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserContextType>(null);
    const setAccount = (userData: any) => {
        setUser(userData);
        setCookies(userData);
    };
    return <UserContext.Provider value={{ user, setAccount }}>{children} </UserContext.Provider>;
};

// type User = {
//     email: string;
//     password: string;
// };
// export type UserContextType = User | null;
type User = any;
export type UserContextType = any;
interface UserProviderProps {
    children: ReactNode;
}

interface setCookiesArgsInterface {
    id: string;
    token: string;
}
const setCookies = ({ id, token }: setCookiesArgsInterface) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // Set now + 30 days as the new date
    document.cookie = `accountId=${id}; expires=` + expiryDate;
    document.cookie = `accountToken=${token}; expires=` + expiryDate;
};
