import React, { useContext, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { InputField } from '../default/Form';
import styles from '../../css/default.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loading } from '../default/Loading';
import { Error } from '../default/Error';
import { Link, useNavigate } from 'react-router-dom';
import { UserContextType, UserContext, SetAccountArgs } from '../../contexts/UserContext';
import { editAccountSchema } from '../../schemas/AccountSchemas';

export type EditAccountFormInputs = {
    email: string;
};

export const EditAccountForm = () => {
    const navigate = useNavigate();
    const { user, setAccount } = useContext<UserContextType>(UserContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const methods = useForm<EditAccountFormInputs>({
        resolver: yupResolver(editAccountSchema),
        mode: 'onTouched',
        defaultValues: {
            email: user?.email,
        },
    });

    const onSubmit: SubmitHandler<EditAccountFormInputs> = async (formData) => {
        try {
            setLoading(true);

            const res = await fetch('http://localhost:8000/api/user/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, id: user?.id }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                setError(`HTTP error (${res.status}): ${errorText}`);
                return;
            }

            setAccount({ ...user, ...formData } as SetAccountArgs);
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
                    </div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className={styles.buttonsContainerSpaced}>
                            <button type='submit' className={styles.btnPrimary}>
                                Submit
                            </button>
                            <Link to='/user/profile' className={styles.btnSecondary}>
                                Cancel
                            </Link>
                        </div>
                    )}
                </form>
            </FormProvider>
            {error && <Error msg={error} marginTop={true} />}
        </>
    );
};
