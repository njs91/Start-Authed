import { ResetPasswordForm, ResetPasswordLinks } from '../../../components/account/ResetPassword';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// @todo: also need login tests
// @todo: also need edit account tests
// @todo: also need delete account (modal) tests
// @todo: perhaps also test user id and email being rendered on user profile page

describe('reset password tests', () => {
    let inputs, labels, password, confirmPassword, submit, back;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <ResetPasswordForm />
                <ResetPasswordLinks />
            </BrowserRouter>
        );

        inputs = [
            screen.getByLabelText('New Password:'),
            screen.getByLabelText('Re-enter Password:'),
            screen.getByRole('button', { type: 'submit' }),
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

    it('should show errors with invalid inputs', async () => {
        // empty error
        await userEvent.click(submit);
        const emptyError = await screen.findByText(/Enter a password/);
        expect(emptyError).toBeInTheDocument();

        // confirm password error
        await userEvent.type(password, 'password');
        await userEvent.click(submit);
        const confirmationError = await screen.findByText(/Passwords must match/);
        expect(confirmationError).toBeInTheDocument();
    });

    // should submit correctly with valid inputs
    // testing for success: on success, it should render <ResetPasswordFinish /> component
    // change this test so that it renders <ResetPassword /> page itself rather than the 2
    // current <ResetPasswordForm /> and <ResetPasswordLinks /> components manually
    // note: might break the other tests, but just fix them if this happens...

    // should show error when user not found
    // NOTE: id and token will probably be undefined (as they're got from search params)
    // in the mock, just make it so that server ignores both of them as they'll probably be undefined
    // but add a test for showing the error - e.g. if password === 'usernotfounderror' then make
    // MSW return a 404 error with 'No user found' message
});
