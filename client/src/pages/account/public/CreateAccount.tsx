import React, { useContext, useEffect } from 'react';
import { CreateAccountForm, CreateAccountLinks } from '../../../components/account/CreateAccount';
import { Page } from '../../../components/Page';
import { createAccountMeta } from '../../MetaTags';
import { useNavigate } from 'react-router-dom';
import { UserContextType, UserContext } from '../../../contexts/UserContext';

const CreateAccount: React.VFC = () => {
    const { user } = useContext<UserContextType>(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/user/profile');
    }, [user, navigate]);

    return (
        <Page meta={createAccountMeta}>
            <h1>Create Account</h1>
            <CreateAccountForm />
            <CreateAccountLinks />
        </Page>
    );
};

export default CreateAccount;
