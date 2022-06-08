import * as Yup from 'yup';

export const emailSchema = Yup.string().email('Enter a valid email address').required('Enter an email address');
export const passwordSchema = Yup.string().required('Enter a password');

export const createAccountSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
