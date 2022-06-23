import React, { useContext, useEffect } from 'react';
import { LoginForm } from '../../../components/account/LoginForm';
import { Page } from '../../../components/Page';
import { loginMeta } from '../../MetaTags';
import styles from '../../../css/pages/login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { UserContextType, UserContext } from '../../../contexts/UserContext';

const Login: React.VFC = () => {
    const { user } = useContext<UserContextType>(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/user/profile');
    }, [user, navigate]);

    return (
        <Page meta={loginMeta}>
            <h1>Login</h1>
            <LoginForm />
            <p className={styles.signInLink}>
                <Link to='/forgot-password'>Forgot password</Link>.
            </p>
            <p className={styles.signInLink}>
                Don't have an account? <Link to='/create-account'>Create an account</Link>.
            </p>
        </Page>
    );
};

export default Login;
