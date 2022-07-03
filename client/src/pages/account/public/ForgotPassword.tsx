import React from 'react';
import { ForgotPasswordForm } from '../../../components/account/ForgotPasswordForm';
import { Page } from '../../../components/Page';
import { forgotPasswordMeta } from '../../MetaTags';

const ForgotPassword = () => (
    <Page meta={forgotPasswordMeta}>
        <h1>Forgot Your Password?</h1>
        <p>Enter the email address of your account to receive instructions about resetting your password.</p>
        <ForgotPasswordForm />
    </Page>
);

export default ForgotPassword;
