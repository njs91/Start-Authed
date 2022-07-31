import React, { useContext, useEffect } from 'react';
import { LoginForm, LoginFormLinks } from '../../../components/account/Login';
import { Page } from '../../../components/Page';
import { loginMeta } from '../../MetaTags';
import { useNavigate } from 'react-router-dom';
import { UserContextType, UserContext } from '../../../contexts/UserContext';

const Login: React.VFC = () => {
    const { user } = useContext<UserContextType>(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/user/profile');
    }, [user, navigate]);

    return (
        <Page meta={loginMeta}>
            <h1>Login</h1>
            <LoginForm affiliateLogin={false} />
            <LoginFormLinks />
        </Page>
    );
};

export default Login;
