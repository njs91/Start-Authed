import EditAccount from '../../../pages/account/private/EditAccount';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockUserContext, mockUser } from '../../mocks/contexts';
import userEvent from '@testing-library/user-event';
import Modal from 'react-modal';

describe('edit account tests', () => {
    let inputs, label, email, submit, buttons, cancelBtn, deleteAccountBtn;

    beforeEach(() => {
        render(
            <div id='root'>
                <BrowserRouter>
                    <MockUserContext>
                        <EditAccount />
                    </MockUserContext>
                </BrowserRouter>
            </div>
        );

        Modal.setAppElement('#root'); // needed when rendering modals

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
    });

    it('should be able to open the model when clicking delete account', async () => {
        // opens when clicking deleteAccountBtn
        await userEvent.click(deleteAccountBtn);
        const openedModal = document.getElementsByClassName('ReactModal__Body--open')[0];
        const modalTitle = screen.getByText(/Delete Your Account/);
        expect(openedModal).toBeInTheDocument();
        expect(modalTitle).toBeInTheDocument();

        // closes when clicking cancel
        const cancelModalBtn = screen.getAllByText('Cancel')[1];
        await userEvent.click(cancelModalBtn);
        expect(openedModal).not.toHaveClass('ReactModal__Body--open');
        expect(modalTitle).not.toBeInTheDocument();
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
