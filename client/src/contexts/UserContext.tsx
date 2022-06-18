import React, { createContext, FC, ReactNode, useState } from 'react';
import { deleteCookies, getCookie } from '../utils/HelperFunctions';

export const UserContext = createContext<UserContextType>({
    user: undefined,
    setAccount: () => {},
});

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<SetAccountArgs | undefined>(getAccountFromCookies());
    const setAccount = (userData: SetAccountArgs): void => {
        setUser(userData);
        setAccountCookies(userData);
    };
    return <UserContext.Provider value={{ user, setAccount }}>{children}</UserContext.Provider>;
};

const getAccountFromCookies = (): User | undefined => {
    const [id, token, email] = [getCookie('accountId'), getCookie('accountToken'), getCookie('accountEmail')];
    if (!id || !token || !email) return;
    return { id, token, email };
};

const setAccountCookies: SetAccountCookiesFn = (userData, path = '/') => {
    if (!userData) {
        deleteCookies(['accountId', 'accountToken', 'accountEmail']);
        return;
    }

    const { id, token, email } = userData;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // expires in 30 days
    const expiryAndPath = `expires=${expiryDate}; path=${path}`;
    document.cookie = `accountId=${id}; ${expiryAndPath}`;
    document.cookie = `accountToken=${token}; ${expiryAndPath}`;
    document.cookie = `accountEmail=${email}; ${expiryAndPath}`;
    // Object.keys(userData).forEach((cookieName) => { // overcomplex?
    //     document.cookie = `account${capitalise(cookieName)}=${cookieName}; ${expiryAndPath}`;
    // });
};

interface UserProviderProps {
    children: ReactNode;
}
export type UserContextType = {
    user: SetAccountArgs | undefined;
    setAccount: (userData: SetAccountArgs) => void;
};
type User = {
    id: string;
    token: string;
    email: string;
};
type SetAccountArgs = User | null;
type SetAccountCookiesFn = (arg0: SetAccountArgs, arg1?: string) => void;
