import { CreateAccountForm } from '../../components/account/CreateAccountForm';
import { ForgotPasswordForm } from '../../components/account/ForgotPasswordForm';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('create account tests', () => {
    let inputs, labels, email, password, confirmPassword, submit;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <CreateAccountForm />
            </BrowserRouter>
        );

        inputs = [
            screen.getByRole('textbox', { name: 'Email:' }),
            screen.getByLabelText('Password:'),
            screen.getByLabelText('Re-enter Password:'),
            screen.getByRole('button', { type: 'submit' }),
        ];
        labels = document.querySelectorAll('form label');
        [email, password, confirmPassword, submit] = inputs;
    });

    it('should render all inputs', () => {
        inputs.forEach((input) => {
            expect(input).toBeInTheDocument();
        });
    });

    it('should render all labels', () => {
        labels.forEach((label) => {
            expect(label).toBeInTheDocument();
        });
    });

    it('should show errors with invalid inputs', async () => {
        await userEvent.type(email, 'wrong@input');
        await userEvent.type(confirmPassword, 'a');
        await userEvent.click(password);
        await userEvent.click(email);

        const errors = [
            await screen.findByText('Enter a valid email address'),
            await screen.findByText('Enter a password'),
            await screen.findByText('Passwords must match'),
        ];

        errors.forEach((error) => expect(error).toBeInTheDocument());
    });

    it('should submit correctly with valid inputs', async () => {
        await userEvent.type(email, 'correct@input.com');
        await userEvent.type(password, 'password');
        await userEvent.type(confirmPassword, 'password');
        await userEvent.click(submit);

        const loadingImage = await screen.findByAltText('loading');
        expect(loadingImage).toBeInTheDocument();

        // @todo: at this point it should be successful (it worked when I changed it to display a success message on the screen),
        // but need to test it for sure
        // when successful, it navigates to /login - how can this be tested?
    });
});

describe('forgot password tests', () => {
    let inputs, label, email, submit, back;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <ForgotPasswordForm />
            </BrowserRouter>
        );

        inputs = [
            screen.getByRole('textbox', { name: 'Email:' }),
            screen.getByRole('button', { type: 'submit' }),
            screen.getByText('Back'),
        ];
        label = document.querySelector('form label');
        [email, submit, back] = inputs;
    });

    it('should render all inputs', () => {
        inputs.forEach((input) => {
            expect(input).toBeInTheDocument();
        });
    });

    it('should render label', () => {
        expect(label).toBeInTheDocument();
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

    it('should have a working back button', () => {
        expect(back).toHaveAttribute('href', '/login');
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
