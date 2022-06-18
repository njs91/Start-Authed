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
    // const setUser = useContext<UserContextType>(UserContext);
    const [account, setAccount] = useState<any>(false); // needed, or just set account context?
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
                setError(`HTTP error: ${res.status}`); // @todo: want to show the proper error message: https://stackoverflow.com/questions/72667627/error-only-shows-at-the-back-end-but-not-correctly-at-the-front-end
                return;
            }

            const accountData = await res.json();
            setAccount(accountData); // perhaps change to setUser from context, and then set cookies - or add the logic to setUser to automatically set the relevant cookies
            setError(false);
            navigate('/user/profile');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    // might need to set cookies here...
    // // e.g. setCookie('Email', res.data.email) - and same for user id and auth token?
    // set data in account context?

    console.log('account: ', account);
    console.log('loading: ', loading);
    console.log('error: ', error);

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.formInner}>
                        <InputField type='text' title='email' placeholder='joe@bloggs.com' />
                        <InputField type='text' title='password' placeholder='********' />
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
