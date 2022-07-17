import React, { Dispatch, FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResetPasswordForm, ResetPasswordLinks } from '../../../components/account/ResetPassword';
import { Success } from '../../../components/default/States';
import { Page } from '../../../components/Page';
import { resetPasswordMeta } from '../../MetaTags';
import styles from '../../../css/default.module.scss';

const ResetPassword = () => {
    const [success, setSuccess] = useState<boolean>(false);

    return (
        <Page meta={resetPasswordMeta}>
            {success ? <ResetPasswordFinish /> : <ResetPasswordStart setSuccess={setSuccess} />}
        </Page>
    );
};

const ResetPasswordFinish = () => (
    <>
        <h1>Success</h1>
        <Success msg='Password successfully reset' marginTop={true} />
        <div className={`${styles.buttonsContainer} ${styles.spaced} ${styles.marginTop}`}>
            <Link to='/login' className={styles.btnPrimary}>
                Login
            </Link>
        </div>
    </>
);

interface ResetPasswordStartProps {
    setSuccess: Dispatch<boolean>;
}
const ResetPasswordStart: FC<ResetPasswordStartProps> = ({ setSuccess }) => (
    <>
        <h1>Create New Password</h1>
        <p>We'll ask for this password whenever you sign in.</p>
        <ResetPasswordForm setSuccess={setSuccess} />
        <ResetPasswordLinks />
    </>
);

export default ResetPassword;
