import { ForgotPasswordForm, ForgotPasswordLinks } from '../../../components/account/ForgotPassword';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('forgot password tests', () => {
    let inputs, label, email, submit, back;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <ForgotPasswordForm />
                <ForgotPasswordLinks />
            </BrowserRouter>
        );

        inputs = [screen.getByRole('textbox', { name: 'Email:' }), screen.getByRole('button', { type: 'submit' })];
        label = screen.getByText(/Email/);
        [email, submit] = inputs;
        back = screen.getByText('login');
    });

    it('should render all inputs', () => {
        inputs.forEach((input) => {
            expect(input).toBeInTheDocument();
        });
    });

    it('should render label', () => {
        expect(label).toBeInTheDocument();
    });

    it('should render back button with correct href', () => {
        expect(back).toBeInTheDocument();
        expect(back).toHaveAttribute('href', '/login');
    });

    it('should show errors with invalid inputs', async () => {
        // empty error
        await userEvent.click(submit);
        const emptyError = await screen.findByText('Enter an email address');

        // format error
        await userEvent.type(email, 'wrong@input');
        await userEvent.click(submit);
        const formatError = await screen.findByText('Enter a valid email address');

        [emptyError, formatError].forEach((error) => expect(error).toBeInTheDocument());
        // note: toBeInTheDocument checks whether they're valid DOM elements,
        // not whether they're simultaneously in the document like the name implies
    });

    it('should submit correctly with valid input', async () => {
        await userEvent.type(email, 'correct@input.com');
        await userEvent.click(submit);

        const loadingImage = await screen.findByAltText('loading');
        expect(loadingImage).toBeInTheDocument();

        // @todo: at this point it should be successful, but should test it for sure
        // when successful, it navigates to /forgot-password-success - how can this be tested?
    });

    it('should show error when user not found', async () => {
        await userEvent.type(email, 'user@not.found');
        await userEvent.click(submit);
        const notFoundError = await screen.findByText(/No user found/);
        expect(notFoundError).toBeInTheDocument();
    });
});
