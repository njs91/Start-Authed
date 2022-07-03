import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { BelowFormLinks, InputField } from '../default/Form';
import styles from '../../css/default.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loading } from '../default/Loading';
import { Error } from '../default/Error';
import { forgotPasswordSchema } from '../../schemas/AccountSchemas';
import { Link, useNavigate } from 'react-router-dom';

export type ForgotPasswordFormInputs = {
    email: string;
};

export const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | boolean>(false);

    const methods = useForm<ForgotPasswordFormInputs>({
        resolver: yupResolver(forgotPasswordSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
        },
    });

    const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (formData) => {
        try {
            setLoading(true);

            const res = await fetch('http://localhost:8000/api/user/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorText = await res.text();
                setError(`HTTP error (${res.status}): ${errorText}`);
                return;
            }

            navigate('/forgot-password-success');
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
                    </div>

                    {loading ? (
                        <Loading />
                    ) : (
                        <button type='submit' className={styles.btnPrimary}>
                            Continue
                        </button>
                    )}
                </form>
            </FormProvider>
            {error && <Error msg={error as string} marginTop={true} />}
        </>
    );
};

export const ForgotPasswordLinks = () => (
    <BelowFormLinks>
        Back to <Link to='/login'>login</Link>.
    </BelowFormLinks>
);
