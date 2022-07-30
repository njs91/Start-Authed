import React, { FC, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { BelowFormLinks, InputField } from '../default/Form';
import styles from '../../css/default.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAccountSchema } from '../../schemas/AccountSchemas';
import { Loading, Error } from '../default/States';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/HelperFunctions';

type Referrer = string | null;
type CreateAccountFormInputs = {
    email: string;
    password: string;
    passwordConfirmation: string;
};
type SubmissionData = CreateAccountFormInputs & {
    referrer: Referrer;
    directAffiliateSignup: boolean;
};
interface CreateAccountFormProps {
    affiliateForm: boolean;
}

export const CreateAccountForm: FC<CreateAccountFormProps> = ({ affiliateForm }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const methods = useForm<CreateAccountFormInputs>({
        resolver: yupResolver(createAccountSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },
    });

    const onSubmit: SubmitHandler<CreateAccountFormInputs> = async (formData) => {
        const referrer: Referrer = getCookie('referrer');
        const redirectUrl: string = `${affiliateForm ? '/affiliates' : ''}/login`;
        const submissionData: SubmissionData = { ...formData, directAffiliateSignup: affiliateForm, referrer };

        try {
            setLoading(true);

            const res = await fetch('http://localhost:8000/api/user/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            if (!res.ok) {
                const errorText = await res.text();
                setError(`HTTP error (${res.status}): ${errorText}`);
                return;
            }

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
                            {affiliateForm ? 'Register' : 'Create Account'}
                        </button>
                    )}
                </form>
            </FormProvider>
            {error && <Error msg={error} marginTop={true} />}
        </>
    );
};

export const CreateAccountLinks = () => (
    <BelowFormLinks>
        Already have an account? <Link to='/login'>Log in</Link>.
    </BelowFormLinks>
);

export const CreateAffiliateAccountLinks = () => (
    <BelowFormLinks>
        Already have an affiliate or user account? You can <Link to='/affiliates/login'>log in</Link> as an affiliate.
    </BelowFormLinks>
);
