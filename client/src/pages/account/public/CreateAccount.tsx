import React from 'react';
import { CreateAccountForm } from '../../../components/login/CreateAccountForm';
import { Page } from '../../../components/Page';
import { createAccountMeta } from '../../MetaTags';
import styles from '../../../css/pages/login.module.scss';
import { Link } from 'react-router-dom';

const CreateAccount: React.VFC = () => (
    <Page meta={createAccountMeta}>
        <h1>Create Account</h1>
        <CreateAccountForm />
        <p className={styles.createAccount}>
            Already have an account? <Link to='/login'>Log in</Link>.
        </p>
    </Page>
);

export default CreateAccount;
