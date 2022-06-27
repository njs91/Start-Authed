import React, { useContext, useEffect } from 'react';
import { CreateAccountForm } from '../../../components/account/CreateAccountForm';
import { Page } from '../../../components/Page';
import { createAccountMeta } from '../../MetaTags';
import styles from '../../../css/pages/login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
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
            <p className={styles.loginLink}>
                Already have an account? <Link to='/login'>Log in</Link>.
            </p>
        </Page>
    );
};

export default CreateAccount;
