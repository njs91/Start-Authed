import React, { FC, useContext, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { BelowFormLinks, InputField } from '../default/Form';
import styles from '../../css/default.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loading, Error } from '../default/States';
import { Link, useNavigate } from 'react-router-dom';
import { UserContextType, UserContext } from '../../contexts/UserContext';
import { loginSchema } from '../../schemas/AccountSchemas';

export type LoginFormInputs = {
    email: string;
    password: string;
};
interface LoginFormProps {
    affiliateLogin: boolean;
}
export const LoginForm: FC<LoginFormProps> = ({ affiliateLogin }) => {
    const navigate = useNavigate();
    const { setAccount } = useContext<UserContextType>(UserContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | boolean>(false);

    const methods = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = async (formData) => {
        const redirectUrl: string = `/user/profile${affiliateLogin ? '/affiliate' : ''}`;

        try {
            setLoading(true);

            const res = await fetch('http://localhost:8000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorText = await res.text();
                setError(`HTTP error (${res.status}): ${errorText}`);
                return;
            }

            const loginData = await res.json();
            const accountData = { ...loginData, email: formData.email };
            setAccount(accountData);
            navigate(redirectUrl);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.formInner}>
                        <InputField type='text' title='email' placeholder='joe@bloggs.com' />
                        <InputField type='password' title='password' placeholder='********' />
                    </div>

                    {loading ? (
                        <Loading />
                    ) : (
                        <button type='submit' className={styles.btnPrimary}>
                            Log in
                        </button>
                    )}
                </form>
            </FormProvider>
            {error && <Error msg={error as string} marginTop={true} />}
        </>
    );
};

export const LoginFormLinks = () => (
    <>
        <BelowFormLinks>
            <Link to='/forgot-password'>Forgot password</Link>.
        </BelowFormLinks>
        <BelowFormLinks>
            Don't have an account? <Link to='/create-account'>Create an account</Link>.
        </BelowFormLinks>
    </>
);

export const AffiliateLoginFormLinks = () => (
    <>
        <BelowFormLinks>
            <Link to='/forgot-password'>Forgot password</Link>.
        </BelowFormLinks>
        <BelowFormLinks>
            Haven't registered as an affiliate? If you have a user account then you will automatically be an affiliate
            and can log in with that account, otherwise you'll need to{' '}
            <Link to='/affiliates/register'>create an account</Link>.
        </BelowFormLinks>
    </>
);
