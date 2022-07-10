import EditAccount from '../../../pages/account/private/EditAccount';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockUserContext, mockUser } from '../../mocks/contexts';
import userEvent from '@testing-library/user-event';
import Modal from 'react-modal';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('edit account tests', () => {
    let inputs: HTMLElement[],
        label: HTMLElement,
        email: HTMLElement,
        submit: HTMLElement,
        buttons: HTMLElement[],
        cancelBtn: HTMLElement,
        deleteAccountBtn: HTMLElement;

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
        inputs.forEach((input: HTMLElement): void => {
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
        buttons.forEach((button: HTMLElement): void => {
            expect(button).toBeInTheDocument();
        });
        expect(cancelBtn).toHaveAttribute('href', '/user/profile');
    });

    it('should be able to open & close modal and render correct elements', async () => {
        // opens when clicking deleteAccountBtn and renders elements
        await userEvent.click(deleteAccountBtn);
        const openedModal = document.getElementsByClassName('ReactModal__Body--open')[0];
        const modalElements = [
            screen.getByText(/Delete Your Account/),
            screen.getByText('Delete'),
            screen.getAllByText('Cancel')[1],
            screen.getByRole('button', { name: 'close' }),
        ];
        [openedModal, ...modalElements].forEach((el: Element): void => expect(el).toBeInTheDocument());

        // closes when clicking cancel
        const cancelModalBtn = modalElements[2];
        await userEvent.click(cancelModalBtn);
        expect(openedModal).not.toHaveClass('ReactModal__Body--open');
        modalElements.forEach((el: HTMLElement): void => expect(el).not.toBeInTheDocument());

        // closes when clicking cross
        await userEvent.click(deleteAccountBtn);
        expect(openedModal).toHaveClass('ReactModal__Body--open');
        const crossBtn = screen.getByRole('button', { name: 'close' }); // cannot use modalElements[3], otherwise it's not in the document
        await userEvent.click(crossBtn);
        expect(openedModal).not.toHaveClass('ReactModal__Body--open');
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
        [emptyError, inputError].forEach((error: HTMLElement): void => expect(error).not.toBeInTheDocument());
    });

    it('should submit correctly with valid inputs', async () => {
        await userEvent.clear(email);
        await userEvent.type(email, 'correct@email.input');
        await userEvent.click(submit);

        // loading image shows
        const loadingImage = await screen.findByAltText('loading');
        expect(loadingImage).toBeInTheDocument();

        // loading image disappears
        await waitForElementToBeRemoved(loadingImage);
        expect(loadingImage).not.toBeInTheDocument();

        // navigates away
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
        expect(mockedUseNavigate).toHaveBeenCalledWith('/user/profile');
    });

    it('should show error when same current email submitted', async () => {
        await userEvent.clear(email);
        await userEvent.type(email, 'current@same.email');
        await userEvent.click(submit);

        const sameEmailError = await screen.findByText(/Could not update user/);
        expect(sameEmailError).toBeInTheDocument();
    });

    it('should be able to successfully delete an account; modal should submit', async () => {
        await userEvent.click(deleteAccountBtn);
        const deleteBtn = screen.getByText('Delete');
        await userEvent.click(deleteBtn);

        // loading image shows
        const loadingImage = await screen.findByAltText('loading');
        expect(loadingImage).toBeInTheDocument();

        // loading image disappears
        await waitForElementToBeRemoved(loadingImage);
        expect(loadingImage).not.toBeInTheDocument();

        // navigates away
        // expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
        // expect(mockedUseNavigate).toHaveBeenCalledWith('/login');
        // @todo

        // NOTE: it does this instead: <Navigate to='/login' /> (after setAccount(null)); does not use useNavigate hook
    });
});
