import React, { useState, VFC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { InputField } from '../default/Form';
import styles from '../../css/default.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAccountSchema } from '../../schemas/CreateAccountSchema';
import { Loading } from '../default/Loading';
import { Error } from '../default/Error';

export type CreateAccountFormInputs = {
    email: string;
    password: string;
    passwordConfirmation: string;
};

export const CreateAccountForm: VFC = () => {
    const [data, setData] = useState<any>();
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
        try {
            setLoading(true);

            const res = await fetch('http://localhost:8000/api/user/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                setError(`HTTP error: ${res.status}`);
                return;
            }

            const resJson = await res.json();
            setData(resJson);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

        // might need to set cookies here...
        // e.g. setCookie('Email', res.data.email) - and same for user id and auth token?

        // note: if clicking inside lastName, input changes from null to '', so submit as the following:
        // console.log(
        //     'lastName: ',
        //     data.lastName,
        //     ' - will submit as: ',
        //     data?.lastName?.length === 0 ? null : data.lastName
        // );
    };

    console.log('data: ', data);
    console.log('loading: ', loading);
    console.log('error: ', error);

    // const fetchProducts = async () => { // needs async keyword (returns promise) try { // code to try (that could potentially fail)
    //     const res = await fetch(url); // add await before Fn returning promise // stores result of promise in a variable
    //     if (!res.ok) {
    //     throw new Error(`HTTP error: ${res.status}`); }
    //     const json = await res.json();
    //     return json; }
    //     catch(error) { // what to do if error occurs; catches uncaught errors
    //     console.error(`Could not get products: ${error}`); }
    //     finally {
    //     // code here executes regardless of try-catch result
    //     } }

    //     // e.g. for posting data
    // fetch(url, { // options (for not just GETTING data)
    //     method: 'POST',
    //     headers: { // needed for JSON stringified data
    //     'Content-Type': 'application/json' },
    //     // need to stringify when posting data
    //     body: JSON.stringify({name: 'User 1'}) })

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
                            alias='Confirm Password'
                        />
                    </div>

                    {loading ? (
                        <Loading />
                    ) : (
                        <button type='submit' className={styles.btnPrimary}>
                            Register
                        </button>
                    )}
                </form>
            </FormProvider>
            {error && <Error msg={'@todo error message'} marginTop={true} />}
        </>
    );
};
