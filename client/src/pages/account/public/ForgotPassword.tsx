import React from 'react';
import { ForgotPasswordForm, ForgotPasswordLinks } from '../../../components/account/ForgotPassword';
import { Page } from '../../../components/Page';
import { forgotPasswordMeta } from '../../MetaTags';

const ForgotPassword = () => (
    <Page meta={forgotPasswordMeta}>
        <h1>Forgot Your Password?</h1>
        <p>Enter the email address of your account to receive instructions about resetting your password.</p>
        <ForgotPasswordForm />
        <ForgotPasswordLinks />
    </Page>
);

export default ForgotPassword;
