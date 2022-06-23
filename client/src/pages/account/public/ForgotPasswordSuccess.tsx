import React from 'react';
import { Page } from '../../../components/Page';
import { forgotPasswordSuccessMeta } from '../../MetaTags';

const ForgotPasswordSuccess = () => (
    <Page meta={forgotPasswordSuccessMeta}>
        <h1>Password Reset Instructions Sent</h1>
        <p>
            Check your email inbox in about 5 minutes to find an email with instructions about resetting your password.
            Don't forget to check your <u>junk</u> inbox.
        </p>
    </Page>
);

export default ForgotPasswordSuccess;
