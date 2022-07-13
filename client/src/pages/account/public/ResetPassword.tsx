import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ResetPasswordForm, ResetPasswordLinks } from '../../../components/account/ResetPassword';
import { Success } from '../../../components/default/States';
import { Page } from '../../../components/Page';
import { resetPasswordMeta } from '../../MetaTags';
import styles from '../../../css/default.module.scss';

// option 1
const ResetPassword = () => {
    const [success, setSuccess] = useState<boolean>(false);

    const ResetPasswordStart = () => (
        <>
            <h1>Create New Password</h1>
            <p>We'll ask for this password whenever you sign in.</p>
            <ResetPasswordForm setSuccess={setSuccess} />
            <ResetPasswordLinks />
        </>
    );

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

    return <Page meta={resetPasswordMeta}>{success ? <ResetPasswordFinish /> : <ResetPasswordStart />}</Page>;
};

// // option 2
// const ResetPassword = () => {
//     const [success, setSuccess] = useState<boolean>(false);

//     if (success)
//         return (
//             <Page meta={resetPasswordMeta}>
//                 <ResetPasswordFinish />
//             </Page>
//         );

//     return (
//         <Page meta={resetPasswordMeta}>
//             <h1>Create New Password</h1>
//             <p>We'll ask for this password whenever you sign in.</p>
//             <ResetPasswordForm setSuccess={setSuccess} />
//         </Page>
//     );
// };

// const ResetPasswordFinish = () => (
//     <>
//         <h1>Success</h1>
//         <Success msg='Password successfully reset' marginTop={true} />
//         <div className={`${styles.buttonsContainer} ${styles.spaced} ${styles.marginTop}`}>
//             <Link to='/login' className={styles.btnPrimary}>
//                 Login
//             </Link>
//         </div>
//     </>
// );

export default ResetPassword;
