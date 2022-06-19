import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../../components/Page';
import { UserContext, UserContextType } from '../../../contexts/UserContext';
import { userProfileMeta } from '../../MetaTags';
import styles from '../../../css/default.module.scss';

const UserProfile = () => {
    const { user } = useContext<UserContextType>(UserContext);
    console.log('user from profile: ', user);

    return (
        <Page meta={userProfileMeta}>
            <h1>User Profile</h1>
            <p>View your profile information here</p>
            <Link to='/user/edit-account' className={styles.btnPrimary}>
                Edit Account
            </Link>
        </Page>
    );
};

export default UserProfile;
