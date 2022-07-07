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

    it('should be able to open & close modal and render correct elements', async () => {
        // opens when clicking deleteAccountBtn
        await userEvent.click(deleteAccountBtn);
        const openedModal = document.getElementsByClassName('ReactModal__Body--open')[0];
        const modalTitle = screen.getByText(/Delete Your Account/);
        const modalDeleteBtn = screen.getByText('Delete');
        [openedModal, modalTitle, modalDeleteBtn].forEach((el) => expect(el).toBeInTheDocument());

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
        await userEvent.clear(email);
        await userEvent.type(email, 'correct@email.input');
        await userEvent.click(label);
        [emptyError, inputError].forEach((error) => expect(error).not.toBeInTheDocument());
    });

    it('should submit correctly with valid inputs', async () => {
        await userEvent.clear(email);
        await userEvent.type(email, 'correct@email.input');
        await userEvent.click(submit);

        const loadingImage = await screen.findByAltText('loading');
        expect(loadingImage).toBeInTheDocument();

        // @todo: how to verify that submission was successful? should be successful at this point. Does this:
        // setAccount({ ...user, ...formData } as SetAccountArgs);
        // navigate('/user/profile');
    });

    it('should show error when same current email submitted', async () => {
        await userEvent.clear(email);
        await userEvent.type(email, 'current@same.email');
        await userEvent.click(submit);

        const sameEmailError = await screen.findByText(/Could not update user/);
        expect(sameEmailError).toBeInTheDocument();
    });

    // should also show modal inputs buttons whatever and submit modal successfully
});
