import React from 'react';
import { DeleteAccountModal } from '../../../components/account/DeleteAccountModal';
import { EditAccountForm } from '../../../components/account/EditAccountForm';
import { Page } from '../../../components/Page';
import { editAccountMeta } from '../../MetaTags';

const EditAccount = () => (
    <Page meta={editAccountMeta}>
        <h1>Edit Account</h1>
        <EditAccountForm />
        <DeleteAccountModal />
    </Page>
);

export default EditAccount;
