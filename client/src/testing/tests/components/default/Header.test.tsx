import { accountLinks, Header, links, LinkType } from '../../../../components/Header';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockUserContext } from '../../../mocks/contexts';

describe('navbar links when logged out', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
    });

    it('should render links properly', () => {
        links.forEach(({ title, url }: LinkType): void => {
            expect(screen.getByText(title)).toHaveAttribute('href', url);
        });
    });

    it('should show login button and not logout', () => {
        const login = screen.getByText(/login/i);
        expect(login).toBeInTheDocument();
        const logout = screen.queryByText(/log out/i);
        expect(logout).not.toBeInTheDocument();
    });
});

describe('navbar links when logged in', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <MockUserContext>
                    <Header />
                </MockUserContext>
            </BrowserRouter>
        );
    });

    it('should render account links properly', () => {
        accountLinks.forEach(({ title, url }: LinkType): void => {
            expect(screen.getByText(title)).toHaveAttribute('href', url);
        });
    });

    it('should show logout and not login button', () => {
        const logout = screen.getByText(/log out/i);
        expect(logout).toBeInTheDocument();
        const login = screen.queryByText(/login/i);
        expect(login).not.toBeInTheDocument();
    });
});
