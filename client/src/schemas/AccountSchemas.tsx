import * as Yup from 'yup';

const emailSchema = Yup.string().email('Enter a valid email address').required('Enter an email address');
const passwordSchema = Yup.string().required('Enter a password');

export const createAccountSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const loginSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
});

export const editAccountSchema = Yup.object().shape({
    email: emailSchema,
});

export const forgotPasswordSchema = Yup.object().shape({
    email: emailSchema,
});

export const resetPasswordSchema = Yup.object().shape({
    password: passwordSchema,
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
