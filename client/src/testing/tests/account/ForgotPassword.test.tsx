import { ForgotPasswordForm, ForgotPasswordLinks } from '../../../components/account/ForgotPassword';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('forgot password tests', () => {
    let inputs: HTMLElement[], label: HTMLElement, email: HTMLElement, submit: HTMLElement, back: HTMLElement;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <ForgotPasswordForm />
                <ForgotPasswordLinks />
            </BrowserRouter>
        );

        inputs = [screen.getByRole('textbox', { name: 'Email:' }), screen.getByRole('button', { name: /Continue/ })];
        label = screen.getByText(/Email/);
        [email, submit] = inputs;
        back = screen.getByText('login');
    });

    it('should render all inputs', () => {
        inputs.forEach((input: HTMLElement): void => {
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

    it('should show errors with invalid inputs and disappear when corrected', async () => {
        // empty error
        await userEvent.click(submit);
        const emptyError = await screen.findByText('Enter an email address');
        expect(emptyError).toBeInTheDocument();

        // format error
        await userEvent.type(email, 'wrong@input');
        const formatError = await screen.findByText('Enter a valid email address');
        expect(formatError).toBeInTheDocument();

        // errors disappear
        await userEvent.clear(email);
        await userEvent.type(email, 'correct@email.input');
        [emptyError, formatError].forEach((error: HTMLElement): void => expect(error).not.toBeInTheDocument());
    });

    it('should submit correctly with valid input', async () => {
        await userEvent.type(email, 'correct@input.com');
        await userEvent.click(submit);

        // loading image shows
        const loadingImage = await screen.findByAltText('loading');
        expect(loadingImage).toBeInTheDocument();

        // loading image disappears
        await waitForElementToBeRemoved(loadingImage);
        expect(loadingImage).not.toBeInTheDocument();

        // navigates away
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
        expect(mockedUseNavigate).toHaveBeenCalledWith('/forgot-password-success');
    });

    it('should show error when user not found', async () => {
        await userEvent.type(email, 'user@not.found');
        await userEvent.click(submit);

        const loadingImage = await screen.findByAltText('loading');
        expect(loadingImage).toBeInTheDocument();

        const notFoundError = await screen.findByText(/No user found/);
        expect(notFoundError).toBeInTheDocument();
    });
});
