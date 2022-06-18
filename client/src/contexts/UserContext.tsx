import React, { createContext, FC, ReactNode, useState } from 'react';
import { getCookie } from '../utils/HelperFunctions';

export const UserContext = createContext<UserContextType>({
    user: undefined,
    setAccount: () => {},
});

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(getAccountFromCookies());
    const setAccount = (userData: User): void => {
        setUser(userData);
        setCookies(userData);
    };
    return <UserContext.Provider value={{ user, setAccount }}>{children}</UserContext.Provider>;
};

const getAccountFromCookies = (): User | undefined => {
    const [id, token, email] = [getCookie('accountId'), getCookie('accountToken'), getCookie('accountEmail')];
    if (!id || !token || !email) return;
    return { id, token, email };
};

const setCookies: setCookiesFn = ({ id, token, email }, path = '/') => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // expires in 30 days
    const expiryAndPath = `expires=${expiryDate}; path=${path}`;
    document.cookie = `accountId=${id}; ${expiryAndPath}`;
    document.cookie = `accountToken=${token}; ${expiryAndPath}`;
    document.cookie = `accountEmail=${email}; ${expiryAndPath}`;
};

interface UserProviderProps {
    children: ReactNode;
}
export type UserContextType = {
    user: User | undefined;
    setAccount: (userData: User) => void;
};
type User = {
    id: string;
    token: string;
    email: string;
};
type setCookiesFn = (arg0: User, arg1?: string) => void;
