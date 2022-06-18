import React, { createContext, FC, ReactNode, useState } from 'react';
import { getCookie } from '../utils/HelperFunctions';

// why are there sometimes duplicate cookies with a different 'path'? see screenshot for details

export const UserContext = createContext<UserContextType>(null);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserContextType>(getAccountFromCookies());
    const setAccount = (userData: Userdata) => {
        setUser(userData);
        setCookies(userData);
    };
    return <UserContext.Provider value={{ user, setAccount }}>{children} </UserContext.Provider>;
};

const getAccountFromCookies = (): Userdata | undefined => {
    const [id, token, email] = [getCookie('accountId'), getCookie('accountToken'), getCookie('accountEmail')];
    if (!id || !token || !email) return;
    return { id, token, email };
};

const setCookies = ({ id, token, email }: Userdata) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // expires in 30 days
    document.cookie = `accountId=${id}; expires=` + expiryDate;
    document.cookie = `accountToken=${token}; expires=` + expiryDate;
    document.cookie = `accountEmail=${email}; expires=` + expiryDate;
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
type Userdata = {
    id: string;
    token: string;
    email: string;
};
