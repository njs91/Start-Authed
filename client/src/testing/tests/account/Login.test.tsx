import Login from '../../../pages/account/public/Login';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('reset password tests', () => {
    let inputs: HTMLElement[],
        labels: HTMLElement[],
        links: HTMLElement[],
        email: HTMLElement,
        password: HTMLElement,
        submit: HTMLElement,
        forgotPassword: HTMLElement,
        createAccount: HTMLElement;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        labels = [screen.getByText(/email/i), screen.getByText(/password/)];
        inputs = [screen.getByLabelText(/email/i), screen.getByLabelText(/password/i), screen.getByText(/log in/i)];
        links = [screen.getByText(/forgot password/i), screen.getByText(/create an account/i)];
        [email, password, submit] = inputs;
        [forgotPassword, createAccount] = links;
    });

    it('should render all inputs', () => {
        inputs.forEach((input: HTMLElement): void => {
            expect(input).toBeInTheDocument();
        });
    });

    it('should render all labels', () => {
        labels.forEach((label: HTMLElement): void => {
            expect(label).toBeInTheDocument();
        });
    });

    it('should render all links with correct hrefs', () => {
        links.forEach((link: HTMLElement): void => {
            expect(link).toBeInTheDocument();
        });

        expect(forgotPassword).toHaveAttribute('href', '/forgot-password');
        expect(createAccount).toHaveAttribute('href', '/create-account');
    });

    it('should show errors with invalid inputs and disappear when corrected', async () => {
        // empty errors
        await userEvent.click(submit);
        const emptyErrors = [
            await screen.findByText(/enter an email address/i),
            await screen.findByText(/enter a password/i),
        ];
        emptyErrors.forEach((error: HTMLElement): void => {
            expect(error).toBeInTheDocument();
        });

        // invalid email error
        await userEvent.type(email, 'wrong@input');
        await userEvent.type(password, 'password');
        const emailError = screen.getByText(/enter a valid email address/i);
        expect(emailError).toBeInTheDocument();

        // password error disappears
        const passwordError = screen.queryByText(/enter a password/i);
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

        // loading image shows
        const loadingImage = await screen.findByAltText(/loading/i);
        expect(loadingImage).toBeInTheDocument();

        // loading image disappears
        await waitForElementToBeRemoved(loadingImage);
        expect(loadingImage).not.toBeInTheDocument();

        // navigates away
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
        expect(mockedUseNavigate).toHaveBeenCalledWith('/user/profile');
    });

    it('should show error when user not found', async () => {
        await userEvent.type(email, 'user@not.found');
        await userEvent.type(password, 'password');
        await userEvent.click(submit);

        const loadingImage = await screen.findByAltText(/loading/i);
        expect(loadingImage).toBeInTheDocument();

        const notFoundError = await screen.findByText(/user not found/i);
        expect(notFoundError).toBeInTheDocument();
    });
});
