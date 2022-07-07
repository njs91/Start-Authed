import Login from '../../../pages/account/public/Login';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('reset password tests', () => {
    let inputs, labels, email, password, submit, links, forgotPassword, createAccount;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        labels = [screen.getByText('Email:'), screen.getByText('Password:')];
        inputs = [screen.getByLabelText('Email:'), screen.getByLabelText('Password:'), screen.getByText('Log in')];
        links = [screen.getByText(/Forgot password/), screen.getByText(/Create an account/)];
        [email, password, submit] = inputs;
        [forgotPassword, createAccount] = links;
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

    it('should render all links with correct hrefs', () => {
        links.forEach((link) => {
            expect(link).toBeInTheDocument();
        });

        expect(forgotPassword).toHaveAttribute('href', '/forgot-password');
        expect(createAccount).toHaveAttribute('href', '/create-account');
    });

    it('should show errors with invalid inputs and disappear when corrected', async () => {
        // empty errors
        await userEvent.click(submit);
        const emptyErrors = [
            await screen.findByText(/Enter an email address/),
            await screen.findByText(/Enter a password/),
        ];
        emptyErrors.forEach((error) => {
            expect(error).toBeInTheDocument();
        });

        // invalid email error
        await userEvent.type(email, 'wrong@input');
        await userEvent.type(password, 'password');
        const emailError = screen.getByText(/Enter a valid email address/);
        expect(emailError).toBeInTheDocument();

        // password error disappears
        const passwordError = screen.queryByText(/Enter a password/);
        expect(passwordError).not.toBeInTheDocument();

        // email error disappears
        await userEvent.clear(email);
        await userEvent.type(email, 'correct@email.input');
        expect(emailError).not.toBeInTheDocument();
    });

    it('should submit correctly with valid inputs', async () => {
        await userEvent.type(email, 'correct@email.input');
        await userEvent.type(password, 'password');
        await userEvent.click(submit);

        const loadingImage = await screen.findByAltText('loading');
        expect(loadingImage).toBeInTheDocument();

        // @todo: how to test for success here? the form does the following:
        // setAccount(accountData);
        // navigate('/user/profile');
        // testing for Log out button on the next page seems to fail
    });

    it('should show error when user not found', async () => {
        await userEvent.type(email, 'user@not.found');
        await userEvent.type(password, 'password');
        await userEvent.click(submit);

        const loadingImage = await screen.findByAltText('loading');
        expect(loadingImage).toBeInTheDocument();

        const notFoundError = await screen.findByText(/User not found/);
        expect(notFoundError).toBeInTheDocument();
    });
});
