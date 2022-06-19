import React from 'react';
import { DeleteAccountModal } from '../../../components/login/DeleteAccountModal';
import { Page } from '../../../components/Page';
import { editAccountMeta } from '../../MetaTags';

const EditAccount = () => (
    <Page meta={editAccountMeta}>
        <h1>Edit Account</h1>
        <p>Edit your account information here</p>
        <DeleteAccountModal />
    </Page>
);

export default EditAccount;
