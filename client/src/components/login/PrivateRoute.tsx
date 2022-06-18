import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext, UserContextType } from '../../contexts/UserContext';

export const PrivateRoute = ({ children }: any) => {
    const { user } = useContext<UserContextType>(UserContext);

    if (!user) {
        return <Navigate to='/login' />;
    }

    return children;
};
