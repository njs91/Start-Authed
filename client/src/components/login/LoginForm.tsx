import React, { useContext, useState, VFC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { InputField } from '../default/Form';
import styles from '../../css/default.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schemas/LoginSchema';
import { Loading } from '../default/Loading';
import { Error } from '../default/Error';
import { useNavigate } from 'react-router-dom';
import { UserContextType, UserContext } from '../../contexts/UserContext';

export type LoginFormInputs = {
    email: string;
    password: string;
};

export const LoginForm: VFC = () => {
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
            navigate('/user/profile');
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
