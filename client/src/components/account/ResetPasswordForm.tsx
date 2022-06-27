import React, { Dispatch, FC, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { InputField } from '../default/Form';
import styles from '../../css/default.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '../../schemas/AccountSchemas';
import { Loading } from '../default/Loading';
import { Error } from '../default/Error';
import { useSearchParams } from 'react-router-dom';

export type ResetPasswordFormInputs = {
    password: string;
    passwordConfirmation: string;
};

interface ResetPasswordFormProps {
    setSuccess: Dispatch<boolean>;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ setSuccess }) => {
    const [searchParams] = useSearchParams();
    const [id, token] = [searchParams.get('id'), searchParams.get('jwt')];
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const methods = useForm<ResetPasswordFormInputs>({
        resolver: yupResolver(resetPasswordSchema),
        mode: 'onTouched',
        defaultValues: {
            password: '',
            passwordConfirmation: '',
        },
    });

    const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async ({ password }) => {
        try {
            setLoading(true);

            const res = await fetch('http://localhost:8000/api/user/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    password,
                    token,
                }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                setError(`HTTP error (${res.status}): ${errorText}`);
                return;
            }

            setSuccess(true);
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
                        <InputField type='password' title='password' placeholder='********' alias='New Password' />
                        <InputField
                            type='password'
                            title='passwordConfirmation'
                            placeholder='********'
                            alias='Re-enter Password'
                        />
                    </div>

                    {loading ? (
                        <Loading />
                    ) : (
                        <button type='submit' className={styles.btnPrimary}>
                            Reset Password
                        </button>
                    )}
                </form>
            </FormProvider>
            {error && <Error msg={error} marginTop={true} />}
        </>
    );
};
