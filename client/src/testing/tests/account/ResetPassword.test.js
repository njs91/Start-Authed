import ResetPassword from '../../../pages/account/public/ResetPassword';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// @todo: also need edit account tests
// @todo: also need delete account (modal) tests
// @todo: turn test files from .test.js to .test.ts/tsx?
// @todo: complete all other @todos

describe('reset password tests', () => {
    let inputs, labels, password, confirmPassword, submit, back;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <ResetPassword />
            </BrowserRouter>
        );

        inputs = [
            screen.getByLabelText('New Password:'),
            screen.getByLabelText('Re-enter Password:'),
            screen.getByText('Reset Password'),
        ];
        labels = [screen.getByText('New Password:'), screen.getByText('Re-enter Password:')];
        [password, confirmPassword, submit] = inputs;
        back = screen.getByText('log in');
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

    it('should render back button with correct href', () => {
        expect(back).toBeInTheDocument();
        expect(back).toHaveAttribute('href', '/login');
    });

    it('should show errors with invalid inputs and disappear when corrected', async () => {
        // empty error
        await userEvent.click(submit);
        const emptyError = await screen.findByText(/Enter a password/);
        expect(emptyError).toBeInTheDocument();

        // confirm password error
        await userEvent.type(password, 'password');
        await userEvent.click(submit);
        const confirmationError = await screen.findByText(/Passwords must match/);
        expect(confirmationError).toBeInTheDocument();

        // errors disappear
        await userEvent.type(confirmPassword, 'password');
        await userEvent.click(submit);
        [emptyError, confirmationError].forEach((error) => expect(error).not.toBeInTheDocument());
    });

    it('should submit correctly with valid inputs', async () => {
        await userEvent.type(password, 'password');
        await userEvent.type(confirmPassword, 'password');
        await userEvent.click(submit);

        const loadingImage = await screen.findByAltText('loading');
        expect(loadingImage).toBeInTheDocument();

        const successHeader = await screen.findByText(/Success/);
        expect(successHeader).toBeInTheDocument();
    });

    it('should show error when user not found', async () => {
        await userEvent.type(password, 'usernotfounderror');
        await userEvent.type(confirmPassword, 'usernotfounderror');
        await userEvent.click(submit);

        const loadingImage = await screen.findByAltText('loading');
        expect(loadingImage).toBeInTheDocument();

        const notFoundError = await screen.findByText(/No user found/);
        expect(notFoundError).toBeInTheDocument();
    });
});
