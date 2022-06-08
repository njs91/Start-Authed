import * as Yup from 'yup';
import { emailSchema, passwordSchema } from './CreateAccountSchema';

export const loginSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
});
