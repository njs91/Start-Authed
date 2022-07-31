import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AffiliateLoginFormLinks, LoginForm } from '../../components/account/Login';
import { Page } from '../../components/Page';
import { UserContextType, UserContext } from '../../contexts/UserContext';
import { affiliateLoginMeta } from '../MetaTags';

const AffiliateLogin = () => {
    const { user } = useContext<UserContextType>(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/user/profile/affiliate');
    }, [user, navigate]);

    return (
        <Page meta={affiliateLoginMeta}>
            <h1>Affiliate Login</h1>
            <LoginForm affiliateLogin={true} />
            <AffiliateLoginFormLinks />
        </Page>
    );
};

export default AffiliateLogin;
