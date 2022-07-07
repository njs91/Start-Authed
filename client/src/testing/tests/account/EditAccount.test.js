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

    it('should show errors with invalid inputs and disappear when corrected', async () => {
        // empty email error
        await userEvent.clear(email);
        await userEvent.click(submit);
        const emptyError = await screen.findByText(/Enter an email address/);
        expect(emptyError).toBeInTheDocument();

        // invalid email error
        await userEvent.type(email, 'wrong@input');
        await userEvent.click(submit);
        const inputError = await screen.findByText(/Enter a valid email address/);
        expect(inputError).toBeInTheDocument();

        // error disappears
        email.value = '';
        await userEvent.type(email, 'correct@email.input');
        await userEvent.click(label);
        [emptyError, inputError].forEach((error) => expect(error).not.toBeInTheDocument());
    });

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
