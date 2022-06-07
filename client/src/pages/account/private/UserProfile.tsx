import React from 'react';
import { Page } from '../../../components/Page';
import { userProfileMeta } from '../../MetaTags';

const UserProfile = () => (
    <Page meta={userProfileMeta}>
        <h1>User Profile</h1>
    </Page>
);

export default UserProfile;
