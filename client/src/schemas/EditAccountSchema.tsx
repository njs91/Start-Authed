import * as Yup from 'yup';
import { emailSchema } from './CreateAccountSchema';

export const editAccountSchema = Yup.object().shape({
    email: emailSchema,
});
