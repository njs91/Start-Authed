import React, { useContext } from 'react';
import { Page } from '../../../components/Page';
import { UserContext, UserContextType } from '../../../contexts/UserContext';
import { userProfileMeta } from '../../MetaTags';

const UserProfile = () => {
    const { user } = useContext<UserContextType>(UserContext);
    console.log('user from profile: ', user);

    return (
        <Page meta={userProfileMeta}>
            <h1>User Profile</h1>
            <p>View your profile information here</p>
        </Page>
    );
};

export default UserProfile;
