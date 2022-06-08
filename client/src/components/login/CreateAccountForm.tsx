import React, { VFC } from 'react';
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
    const methods = useForm<CreateAccountFormInputs>({
        resolver: yupResolver(createAccountSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },
    });
    const onSubmit: SubmitHandler<CreateAccountFormInputs> = (data) => {
        console.log('submitted with: ', data);

        // note: if clicking inside lastName, input changes from null to '', so submit as the following:
        // console.log(
        //     'lastName: ',
        //     data.lastName,
        //     ' - will submit as: ',
        //     data?.lastName?.length === 0 ? null : data.lastName
        // );
    };
    const loading = false; // @todo
    const error = false; // @todo

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
            {error && <Error msg={'Error logging in'} marginTop={true} />}
        </>
    );
};
