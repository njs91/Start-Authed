import Login from '../../../pages/account/public/Login';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import puppeteer from 'puppeteer';
import { wrongUser } from '../../fixtures/user';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('login unit/integration tests', () => {
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
            <HelmetProvider>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </HelmetProvider>
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

jest.setTimeout(30000);

describe('login e2e tests', () => {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 10,
            // devtools: true,
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    it('should redirect unauthenticated user to sign-in page', async () => {
        // visit private link
        await Promise.all([
            page.goto('http://localhost:3000/user/profile'),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);

        // expect to be redirected
        const url = page.url();
        expect(url).toContain('/login');
    });

    it('should show error when submitting invalid credentials', async () => {
        // fill in the form
        await page.type('input[name=email]', wrongUser.email);
        await page.type('input[name=password]', wrongUser.password);
        await page.keyboard.press('Enter');

        // should show loading image
        const loadingImg = await page.waitForSelector('img[alt=loading]', { visible: true });
        expect(loadingImg).toBeDefined();

        // should show error
        const errorImage = await page.waitForSelector('svg[data-icon="triangle-exclamation"]', { visible: true });
        const pageContent = await page.$eval('body', (el) => el.innerText);
        expect(errorImage).toBeDefined();
        expect(pageContent).toContain('User not found');
    });

    it('should submit correctly, show loading, set cookies & redirect to profile', async () => {
        // fill in the form
        // should show loading image
        // should redirect to user profile
        // should reflect being logged in
        // auth cookies should exist
    });
});
