import React from 'react';
import { Page } from '../../../components/Page';
import { editAccountMeta } from '../../MetaTags';

const EditAccount = () => (
    <Page meta={editAccountMeta}>
        <h1>Edit Account</h1>
        <p>Edit your account information here</p>
    </Page>
);

export default EditAccount;
