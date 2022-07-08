import UserProfile from '../../../pages/account/private/UserProfile';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockUserContext, mockUser } from '../../mocks/contexts';

describe('user profile tests', () => {
    let editAccountBtn: HTMLElement;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <MockUserContext>
                    <UserProfile />
                </MockUserContext>
            </BrowserRouter>
        );

        editAccountBtn = screen.getByText(/Edit Account/);
    });

    it('should render account information', () => {
        const { email: mockEmail, id: mockId } = mockUser;
        const [email, id] = [screen.getByText(new RegExp(mockEmail)), screen.getByText(new RegExp(mockId))];

        expect(email).toBeInTheDocument();
        expect(id).toBeInTheDocument();
    });

    it('should render edit account button with correct link', () => {
        expect(editAccountBtn).toBeInTheDocument();
        expect(editAccountBtn).toHaveAttribute('href', '/user/edit-account');
    });
});
