import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateAccountForm, CreateAffiliateAccountLinks } from '../../components/account/CreateAccount';
import { Page } from '../../components/Page';
import { UserContextType, UserContext } from '../../contexts/UserContext';
import { createAffiliateAccountMeta } from '../MetaTags';

const AffiliateRegistry = () => {
    const { user } = useContext<UserContextType>(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/user/profile/affiliate');
    }, [user, navigate]);

    return (
        <Page meta={createAffiliateAccountMeta}>
            <h1>Register as an affiliate</h1>
            <CreateAccountForm affiliateForm={true} />
            <CreateAffiliateAccountLinks />
        </Page>
    );
};

export default AffiliateRegistry;
