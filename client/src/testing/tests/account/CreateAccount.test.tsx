import {
    CreateAccountForm,
    CreateAccountLinks,
    CreateAffiliateAccountLinks,
} from '../../../components/account/CreateAccount';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

const [createAccountBtn, registerAffiliateBtn]: string[] = ['Create Account', 'Register'];
const [loginLink, affiliateLoginLink]: string[] = ['/login', '/affiliates/login'];

describe('create account', () => {
    let inputs: HTMLElement[],
        labels: HTMLElement[],
        email: HTMLElement,
        password: HTMLElement,
        confirmPassword: HTMLElement,
        submit: HTMLElement;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <CreateAccountForm affiliateForm={false} />
            </BrowserRouter>
        );

        inputs = [
            screen.getByRole('textbox', { name: /email/i }),
            screen.getByLabelText('Password:'),
            screen.getByLabelText(/re-enter password/i),
            screen.getByRole('button', { name: createAccountBtn }),
        ];
        labels = [screen.getByText(/email/i), screen.getByText('Password:'), screen.getByText(/re-enter password/i)];
        [email, password, confirmPassword, submit] = inputs;
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

    it('should render correct create account button text', () => {
        expect(submit.textContent).toBe(createAccountBtn);
    });

    it('should show errors with invalid inputs and disappear when corrected', async () => {
        await userEvent.type(email, 'wrong@input');
        await userEvent.type(confirmPassword, 'a');
        await userEvent.click(password);
        await userEvent.click(email);

        const errors = [
            await screen.findByText(/enter a valid email address/i),
            await screen.findByText(/enter a password/i),
            await screen.findByText(/passwords must match/i),
        ];

        // errors show
        errors.forEach((error: HTMLElement): void => expect(error).toBeInTheDocument());

        // errors disappear
        [email, confirmPassword].forEach(async (input: HTMLElement): Promise<void> => await userEvent.clear(input));
        await userEvent.type(email, 'correct@email.input');
        await userEvent.type(password, 'password');
        await userEvent.type(confirmPassword, 'password');
        errors.forEach((error: HTMLElement): void => expect(error).not.toBeInTheDocument());
    });

    it('should submit correctly with valid inputs', async () => {
        await userEvent.type(email, 'correct@input.com');
        await userEvent.type(password, 'password');
        await userEvent.type(confirmPassword, 'password');
        await userEvent.click(submit);

        // loading image shows
        const loadingImage = await screen.findByAltText(/loading/i);
        expect(loadingImage).toBeInTheDocument();

        // loading image disappears
        await waitForElementToBeRemoved(loadingImage);
        expect(loadingImage).not.toBeInTheDocument();

        // navigates away (to /login)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login');
    });

    it('should show error when account already exists', async () => {
        await userEvent.type(email, 'account@already.exists');
        await userEvent.type(password, 'password');
        await userEvent.type(confirmPassword, 'password');
        await userEvent.click(submit);

        const loadingImage = await screen.findByAltText(/loading/i);
        expect(loadingImage).toBeInTheDocument();

        const accountExistsError = await screen.findByText(/user already exists/i);
        expect(accountExistsError).toBeInTheDocument();
    });
});

describe('create account links', () => {
    it('should render login button with correct href', () => {
        render(
            <BrowserRouter>
                <CreateAccountLinks />
            </BrowserRouter>
        );
        const back: HTMLElement = screen.getByText(/log in/i);

        expect(back).toBeInTheDocument();
        expect(back).toHaveAttribute('href', loginLink);
    });
});

describe('create affiliate account', () => {
    it('should redirect to correct path with affiliate form', async () => {
        render(
            <BrowserRouter>
                <CreateAccountForm affiliateForm={true} />
            </BrowserRouter>
        );

        const inputs = [
            screen.getByRole('textbox', { name: /email/i }),
            screen.getByLabelText('Password:'),
            screen.getByLabelText(/re-enter password/i),
            screen.getByRole('button', { name: registerAffiliateBtn }),
        ];
        const [email, password, confirmPassword, submit] = inputs;

        await userEvent.type(email, 'correct@input.com');
        await userEvent.type(password, 'password');
        await userEvent.type(confirmPassword, 'password');
        await userEvent.click(submit);

        // expect correct submit button text
        expect(submit.textContent).toBe(registerAffiliateBtn);

        // loading image shows
        const loadingImage = await screen.findByAltText(/loading/i);
        expect(loadingImage).toBeInTheDocument();

        // loading image disappears
        await waitForElementToBeRemoved(loadingImage);
        expect(loadingImage).not.toBeInTheDocument();

        // navigates away (to /affiliates/login)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
        expect(mockedUseNavigate).toHaveBeenCalledWith('/affiliates/login');
    });
});

describe('create affiliate account links', () => {
    it('should render affiliate login button with correct href', () => {
        render(
            <BrowserRouter>
                <CreateAffiliateAccountLinks />
            </BrowserRouter>
        );
        const back: HTMLElement = screen.getByText(/log in/i);

        expect(back).toBeInTheDocument();
        expect(back).toHaveAttribute('href', affiliateLoginLink);
    });
});
