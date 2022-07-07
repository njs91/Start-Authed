import { CreateAccountForm, CreateAccountLinks } from '../../../components/account/CreateAccount';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('create account tests', () => {
    let inputs, labels, email, password, confirmPassword, submit, back;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <CreateAccountForm />
                <CreateAccountLinks />
            </BrowserRouter>
        );

        inputs = [
            screen.getByRole('textbox', { name: 'Email:' }),
            screen.getByLabelText('Password:'),
            screen.getByLabelText('Re-enter Password:'),
            screen.getByRole('button', { type: 'submit' }),
        ];
        labels = [screen.getByText(/Email/), screen.getByText('Password:'), screen.getByText(/Re-enter Password/)];
        [email, password, confirmPassword, submit] = inputs;
        back = screen.getByText('Log in');
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
        await userEvent.type(email, 'wrong@input');
        await userEvent.type(confirmPassword, 'a');
        await userEvent.click(password);
        await userEvent.click(email);

        const errors = [
            await screen.findByText('Enter a valid email address'),
            await screen.findByText('Enter a password'),
            await screen.findByText('Passwords must match'),
        ];

        // errors show
        errors.forEach((error) => expect(error).toBeInTheDocument());

        // errors disappear
        [email, confirmPassword].forEach(async (input) => await userEvent.clear(input));
        await userEvent.type(email, 'correct@email.input');
        await userEvent.type(password, 'password');
        await userEvent.type(confirmPassword, 'password');
        await userEvent.click(submit);
        errors.forEach((error) => expect(error).not.toBeInTheDocument());
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

    it('should show error when account already exists', async () => {
        await userEvent.type(email, 'account@already.exists');
        await userEvent.type(password, 'password');
        await userEvent.type(confirmPassword, 'password');
        await userEvent.click(submit);

        const loadingImage = await screen.findByAltText('loading');
        expect(loadingImage).toBeInTheDocument();

        const accountExistsError = await screen.findByText(/User already exists/);
        expect(accountExistsError).toBeInTheDocument();
    });
});
