import React from 'react';
import { PasswordResetForm } from '../../../components/account/ForgotPasswordForm';
import { Page } from '../../../components/Page';
import { forgotPasswordMeta } from '../../MetaTags';

const ForgotPassword = () => {
    return (
        <Page meta={forgotPasswordMeta}>
            <h1>Forgot Your Password?</h1>
            <p>Enter the email address of your account to receive instructions about resetting your password.</p>
            <PasswordResetForm />
        </Page>
    );
};

export default ForgotPassword;
