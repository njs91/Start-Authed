import EditAccount from '../../../pages/account/private/EditAccount';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockUserContext, mockUser } from '../../mocks/contexts';

describe('edit account tests', () => {
    let inputs, label, email, submit, buttons, cancelBtn, deleteAccountBtn;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <MockUserContext>
                    <EditAccount />
                </MockUserContext>
            </BrowserRouter>
        );

        // use this? expect(screen.getByRole('input', { name: 'the-inputs-id' }))
        inputs = [screen.getByLabelText('Email:'), screen.getByText('Submit')];
        [email, submit] = inputs;
        label = screen.getByText(/Email/);
        buttons = [screen.getByText(/Cancel/), screen.getByText(/Delete Account/)];
        [cancelBtn, deleteAccountBtn] = buttons;
    });

    it('should render all inputs', () => {
        inputs.forEach((input) => {
            expect(input).toBeInTheDocument();
        });
    });

    it('should render label', () => {
        expect(label).toBeInTheDocument();
    });

    it('should show the correct email default value', () => {
        expect(email).toHaveValue(mockUser.email);
    });

    it('should render buttons with correct hrefs', () => {
        buttons.forEach((button) => {
            expect(button).toBeInTheDocument();
        });
        expect(cancelBtn).toHaveAttribute('href', '/user/profile');
        // expect clicking delete account button to show the modal
    });

    // it('should show errors with invalid inputs and disappear when corrected', async () => {
    //     // empty error
    //     await userEvent.click(submit);
    //     const emptyError = await screen.findByText(/Enter a password/);
    //     expect(emptyError).toBeInTheDocument();

    //     // confirm password error
    //     await userEvent.type(password, 'password');
    //     await userEvent.click(submit);
    //     const confirmationError = await screen.findByText(/Passwords must match/);
    //     expect(confirmationError).toBeInTheDocument();

    //     // errors disappear
    //     await userEvent.type(confirmPassword, 'password');
    //     await userEvent.click(submit);
    //     [emptyError, confirmationError].forEach((error) => expect(error).not.toBeInTheDocument());
    // });

    // it('should submit correctly with valid inputs', async () => {
    //     await userEvent.type(password, 'password');
    //     await userEvent.type(confirmPassword, 'password');
    //     await userEvent.click(submit);

    //     const loadingImage = await screen.findByAltText('loading');
    //     expect(loadingImage).toBeInTheDocument();

    //     const successHeader = await screen.findByText(/Success/);
    //     expect(successHeader).toBeInTheDocument();
    // });

    // it('should show error when user not found', async () => {
    //     await userEvent.type(password, 'usernotfounderror');
    //     await userEvent.type(confirmPassword, 'usernotfounderror');
    //     await userEvent.click(submit);

    //     const loadingImage = await screen.findByAltText('loading');
    //     expect(loadingImage).toBeInTheDocument();

    //     const notFoundError = await screen.findByText(/No user found/);
    //     expect(notFoundError).toBeInTheDocument();
    // });
});
