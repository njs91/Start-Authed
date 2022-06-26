import React from 'react';
import { ResetPasswordForm } from '../../../components/account/ResetPasswordForm';
import { Page } from '../../../components/Page';
import { resetPasswordMeta } from '../../MetaTags';

const ResetPassword = () => (
    <Page meta={resetPasswordMeta}>
        <h1>Create New Password</h1>
        <p>We'll ask for this password whenever you sign in.</p>
        <ResetPasswordForm />
    </Page>
);

export default ResetPassword;
